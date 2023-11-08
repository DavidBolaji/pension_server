import { SubebController } from '../controllers/subeb.controller'
import express from 'express'
const subebRouter = express.Router()

subebRouter.get('/subeb', SubebController.prototype.get)
subebRouter.post('/create/subeb', SubebController.prototype.create)
subebRouter.put('/create/subeb', SubebController.prototype.update)
subebRouter.delete('/delete/subeb/:id', SubebController.prototype.delete)
subebRouter.get('/subeb/search', SubebController.prototype.search)
export { subebRouter }
