import {Router, Request, Response} from 'express'
import {db} from '../utils/db'

const authRouter = Router()

async function authenticateUser(req: Request, res: Response) {
	try {
		let {walletId, userOrganization, userRole} = req.body
		
		userRole = userRole || "APPLICANT"
		
		
		
		if (userRole !== "ADMIN" && userRole !== "APPLICANT"){
			res.status(400).json({
				"actionStatus": "ERR_INVALID_DATA",
				"invalidData": [
					"userRole"
				]
			})
			return
		}
		
		const {rows: existingUserRows} = await db.query(
			"SELECT * FROM auth_users WHERE walletid = $1",
			[walletId]
		)
		
		if (existingUserRows.length === 0){
			await db.query("BEGIN")
			
			await db.query(
				"INSERT INTO auth_users VALUES ($1, $2, $3)",
				[walletId, userOrganization, userRole]
			);
			
			await db.query("COMMIT")
			
			res.status(200).json({
				"actionStatus": "SUCCESS",
				"authData": {
					walletId,
					userOrganization,
					userRole
				}
			})
		} else {
			const currentUserData: any = existingUserRows[0]
			const {userrole: existingUserRole, userorganization: existingUserOrganization}: any = currentUserData
			if (existingUserRole === userRole && existingUserOrganization === userOrganization){
				res.status(200).json({
					"actionStatus": "SUCCESS",
					"authData": {
						walletId,
						userOrganization,
						userRole
					}
				})
			} else {
				res.status(401).json({
					"actionStatus": "ERR_INVALID_DATA",
					"invalidData": [
						"walletId", "userOrganization", "userRole"
					]
				})
			}
		}
	} catch (err: any) {
		console.error(err)
		res.status(500).json({
			"actionStatus": "ERR_INTERNAL_ERROR"
		})
	}
}

authRouter.post(
	'/login',
	authenticateUser
)

export {
	authRouter
}