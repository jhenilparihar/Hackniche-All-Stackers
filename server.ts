import * as express from 'express';
import * as dotenv from 'dotenv'
import * as cors from 'cors';
import helmet from 'helmet'
import {authRouter} from "./routes/authRoutes";

dotenv.config()

const server = express()

server.use(
	express.urlencoded({
		extended: true
	})
)

server.use(
	express.json()
)

server.use(cors())
server.use(helmet())

server.use(
	'/login',
	authRouter
)

server.listen(
	process.env.PORT,
	() => {
		console.log("Certifyer Backend is up and running on port", process.env.PORT)
	}
)