import { Request, Response } from 'express'
import { AuthModel } from '../models/auth.model'
export class AuthController {
  public async login(req: Request, res: Response) {
    const { email, password } = req.body
    try {
      const user = await AuthModel.signin(email, password)
      res.status(200).send({ message: 'Succesful sign in', data: user })
    } catch (error: any) {
      res.status(400).send({ message: error.message, data: {} })
    }
  }

  public async signout(req: Request, res: Response) {
    console.log('got to signout controller')
    res.status(200).send({ message: 'signout successful', data: {} })
  }
}
