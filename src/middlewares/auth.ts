import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { IAuthDb } from '../features/auth/interfaces/auth.interface'
import { AuthModel } from '../features/auth/models/auth.model'

declare global {
  namespace Express {
    interface Request {
      authUser?: IAuthDb
    }
  }
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers['authorization']

  if (header) {
    const token = header.replace('Bearer ', '')

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number
      iat: number
    }

    if (!decoded) return res.status(401).send({ message: 'Unauthorized' })

    const result = (await AuthModel.findAuth(+decoded.id!, token)) as IAuthDb
    if (!result) return res.status(401).send({ message: 'Unauthorized' })

    req.authUser = result
    next()
  } else {
    res.status(401).send({ message: 'Unauthorized' })
  }
}

const signOut = async (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers['authorization']
  const token = header?.replace('Bearer ', '')

  try {
    await AuthModel.removeToken(req.authUser?.id!, token!)
    next()
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: 'An error occured' })
  }
}

export { auth, signOut }
