import { MiddleController } from '../controllers/middle.controller'
import express from 'express'
const middleRouter = express.Router()

middleRouter.get('/middle', MiddleController.prototype.get)
middleRouter.post('/create/middle', MiddleController.prototype.create)
middleRouter.put('/create/middle', MiddleController.prototype.update)
middleRouter.delete('/delete/middle/:id', MiddleController.prototype.delete)
middleRouter.get('/middle/search', MiddleController.prototype.search)
export { middleRouter }
