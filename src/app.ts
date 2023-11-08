import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import express, { Express, Request, Response } from 'express'
import 'express-async-errors'
import morgan from 'morgan'
import hpp from 'hpp'
import compression from 'compression'
import { establishDatabaseConnection } from './db/db'
import http from 'http'
import rateLimit from 'express-rate-limit'
import { lgaRouter } from './features/lga/routes/lga.route'
import { subebRouter } from './features/subeb/routes/subeb.routes'
import { phcbRouter } from './features/phcb/routes/phcb.routes'
import { middleRouter } from './features/middle/routes/middle.routes'
import { authRouter } from './features/auth/routes/router.auth'
// Rate limiting settings
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
})

const PATH = '/api/v1'
const app: Express = express()
const server = http.createServer(app)

app.use(
  cors({
    origin: '*',
  }),
)

app.use(express.json())
establishDatabaseConnection()

app.use(express.urlencoded({ extended: true }))
app.use(hpp())
app.use(limiter)
app.use(compression())
app.use(morgan(':method :url :status :response-time ms'))
app.get(PATH, (req: Request, res: Response) => {
  res.send({ message: 'Server is running' })
})

app.use(PATH, lgaRouter)
app.use(PATH, subebRouter)
app.use(PATH, phcbRouter)
app.use(PATH, middleRouter)
app.use(PATH, authRouter)

export { server }
