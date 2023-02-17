import {Router, Request, Response} from 'express'
import {db} from '../utils/db'

const applicationRouter = Router()

async function createApplication(req: Request, res: Response){
	try {
		const {
			walletId, applicantName, applicantUniqueId, applicantGroup,
			applicantEmail, applicantComment, applicationType, appliedOrganization
		} = req.body
		
		await db.query("BEGIN")
		const {rows: creationResultRows} = await db.query(
			`INSERT INTO user_applications
			(walletid, applicantname, applicantuniqueid, applicantgroup, applicantemail, applicantcomments, appliedorganization, applicationtype , applicationdate)
			VALUES
			($1, $2, $3, $4, $5, $6, $7, $8, NOW())
			RETURNING applicationid, applicationstatus`,
			[
				walletId, applicantName,
				applicantUniqueId,
				applicantGroup,
				applicantEmail,
				applicantComment,
				appliedOrganization,
				applicationType
			]
		)
		
		const createdRow = creationResultRows[0]
		
		const {applicationid: createdAppId, applicationstatus: createdAppStatus} = createdRow
		
		await db.query("COMMIT")
		
		res.status(200).json({
			"actionStatus": "SUCCESS",
			"applicationData": {
				"applicationId": createdAppId,
				"applicationStatus": createdAppStatus
			}
		})
	} catch (err: any) {
		await db.query("ROLLBACK")
		console.error(err)
		res.status(500).json({
			"actionStatus": "ERR_INTERNAL_ERROR"
		})
	}
}

async function approveApplication(req: Request, res: Response){
	try {
		const {applicationId} = req.params
		const {chainToken} = req.body
		
		await db.query("BEGIN")
		
		await db.query(
			`UPDATE user_applications
			SET applicationstatus = 'APPROVED', chaintoken = $1
			WHERE applicationid = $2`,
			[chainToken, applicationId]
		)
		
		await db.query("COMMIT")
		
		res.status(200).json({
			"actionStatus": "SUCCESS",
			"applicationData": {
				"applicationId": applicationId,
				"applicationStatus": "APPROVED"
			}
		})
	} catch (err: any) {
		await db.query("ROLLBACK")
		console.error(err)
		res.status(500).json({
			"actionStatus": "ERR_INTERNAL_ERROR"
		})
	}
}

async function rejectApplication(req: Request, res: Response){
	try {
		const {applicationId} = req.params
		
		await db.query("BEGIN")
		
		await db.query(
			`UPDATE user_applications
			SET applicationstatus = 'REJECTED'
			WHERE applicationid = $1`,
			[applicationId]
		)
		
		await db.query("COMMIT")
		
		res.status(200).json({
			"actionStatus": "SUCCESS",
			"applicationData": {
				"applicationId": applicationId,
				"applicationStatus": "REJECTED"
			}
		})
	} catch (err: any) {
		await db.query("ROLLBACK")
		console.error(err)
		res.status(500).json({
			"actionStatus": "ERR_INTERNAL_ERROR"
		})
	}
}

async function getApplications(req: Request, res: Response){
	try {
		const {organizationId} = req.query
		
		const {rows} = await db.query(
			"SELECT * FROM user_applications WHERE appliedorganization = $1",
			[organizationId]
		)
		
		res.status(200).json({
			"actionStatus": "SUCCESS",
			"applicationData": rows
		})
	} catch (err: any){
		console.error(err)
		res.status(500).json({
			"actionStatus": "ERR_INTERNAL_ERROR"
		})
	}
}

applicationRouter.get(
	'/',
	getApplications
)

applicationRouter.post(
	'/',
	createApplication
)

applicationRouter.post(
	`/:applicationId/approve`,
	approveApplication
)

applicationRouter.post(
	`/:applicationId/reject`,
	rejectApplication
)

export {
	applicationRouter
}