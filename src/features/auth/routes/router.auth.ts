import express from 'express'
import { AuthController } from '../controllers/auth.controller'
import { auth, signOut } from '../../../middlewares/auth'
const authRouter = express.Router()

authRouter.post('/auth/login', AuthController.prototype.login)
authRouter.get('/auth/signout', auth, signOut, AuthController.prototype.signout)

export { authRouter }
