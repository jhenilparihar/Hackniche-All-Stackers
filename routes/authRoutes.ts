import {Router, Request, Response} from 'express'
import {db} from '../utils/db'

const authRouter = Router()

async function authenticateUser(req: Request, res: Response) {
	try {
		const {walletId, userOrganization, userRole} = req.body
		
	} catch (err: any) {
		console.error(err)
		
	}
}

export {
	authRouter
}