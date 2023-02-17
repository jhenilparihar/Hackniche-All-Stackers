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
exports.authRouter = void 0;
const express_1 = require("express");
const db_1 = require("../utils/db");
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
function authenticateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { walletId, userOrganization, userRole } = req.body;
            const { rows: existingUserRows } = yield db_1.db.query("SELECT * FROM auth_users WHERE walletid = $1", [walletId]);
            if (existingUserRows.length === 0) {
                yield db_1.db.query("BEGIN");
                yield db_1.db.query("INSERT INTO auth_users VALUES ($1, $2, $3)", [walletId, userOrganization, userRole]);
                yield db_1.db.query("COMMIT");
                res.status(200).json({
                    "actionStatus": "SUCCESS",
                    "authData": {
                        walletId,
                        userOrganization,
                        userRole
                    }
                });
            }
            else {
                const { userorganization: userOrganization, userrole: userRole } = existingUserRows[0];
                res.status(200).json({
                    "actionStatus": "SUCCESS",
                    "authData": {
                        walletId,
                        userOrganization,
                        userRole
                    }
                });
            }
        }
        catch (err) {
            console.error(err);
            res.status(500).json({
                "actionStatus": "ERR_INTERNAL_ERROR"
            });
        }
    });
}
authRouter.post('/login', authenticateUser);
