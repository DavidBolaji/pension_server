import { LgaController } from '../controllers/lga.controller'
import express from 'express'
const lgaRouter = express.Router()

lgaRouter.get('/lga', LgaController.prototype.get)
lgaRouter.post('/lga', LgaController.prototype.getUser)
lgaRouter.post('/create/lga', LgaController.prototype.create)
lgaRouter.put('/lga/update', LgaController.prototype.update)
lgaRouter.delete('/delete/lga/:id', LgaController.prototype.delete)
lgaRouter.get('/lga/search', LgaController.prototype.search)
export { lgaRouter }
