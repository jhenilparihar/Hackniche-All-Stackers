"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationRouter = void 0;
const express_1 = require("express");
const db_1 = require("../utils/db");
const applicationRouter = (0, express_1.Router)();
exports.applicationRouter = applicationRouter;
function createApplication(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { walletId, applicantName, applicantUniqueId, applicantGroup, applicantEmail, applicantComment, appliedOrganization } = req.body;
            yield db_1.db.query("BEGIN");
            const { rows: creationResultRows } = yield db_1.db.query(`INSERT INTO user_applications
			(walletid, applicantname, applicantuniqueid, applicantgroup, applicantemail, applicantcomments, appliedorganization)
			VALUES
			($1, $2, $3, $4, $5, $6, $7)
			RETURNING applicationid, applicationstatus`, [
                walletId, applicantName,
                applicantUniqueId,
                applicantGroup,
                applicantEmail,
                applicantComment,
                appliedOrganization
            ]);
            const createdRow = creationResultRows[0];
            const { applicationid: createdAppId, applicationstatus: createdAppStatus } = createdRow;
            yield db_1.db.query("COMMIT");
            res.status(200).json({
                "actionStatus": "SUCCESS",
                "applicationData": {
                    "applicationId": createdAppId,
                    "applicationStatus": createdAppStatus
                }
            });
        }
        catch (err) {
            yield db_1.db.query("ROLLBACK");
            console.error(err);
            res.status(500).json({
                "actionStatus": "ERR_INTERNAL_ERROR"
            });
        }
    });
}
function approveApplication(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { applicationId } = req.params;
            const { chainToken } = req.body;
            yield db_1.db.query("BEGIN");
            yield db_1.db.query(`UPDATE user_applications
			SET applicationstatus = 'APPROVED', chaintoken = $1
			WHERE applicationid = $2`, [chainToken, applicationId]);
            yield db_1.db.query("COMMIT");
            res.status(200).json({
                "actionStatus": "SUCCESS",
                "applicationData": {
                    "applicationId": applicationId,
                    "applicationStatus": "APPROVED"
                }
            });
        }
        catch (err) {
            yield db_1.db.query("ROLLBACK");
            console.error(err);
            res.status(500).json({
                "actionStatus": "ERR_INTERNAL_ERROR"
            });
        }
    });
}
function rejectApplication(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { applicationId } = req.params;
            yield db_1.db.query("BEGIN");
            yield db_1.db.query(`UPDATE user_applications
			SET applicationstatus = 'REJECTED'
			WHERE applicationid = $1`, [applicationId]);
            yield db_1.db.query("COMMIT");
            res.status(200).json({
                "actionStatus": "SUCCESS",
                "applicationData": {
                    "applicationId": applicationId,
                    "applicationStatus": "REJECTED"
                }
            });
        }
        catch (err) {
            yield db_1.db.query("ROLLBACK");
            console.error(err);
            res.status(500).json({
                "actionStatus": "ERR_INTERNAL_ERROR"
            });
        }
    });
}
applicationRouter.post('/', createApplication);
applicationRouter.post(`/:applicationId/approve`, approveApplication);
applicationRouter.post(`/:applicationId/reject`, rejectApplication);
