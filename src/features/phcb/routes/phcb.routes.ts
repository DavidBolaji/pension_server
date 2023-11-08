import { PhcbController } from '../controllers/phcb.controller'
import express from 'express'
const phcbRouter = express.Router()

phcbRouter.get('/phcb', PhcbController.prototype.get)
phcbRouter.post('/create/phcb', PhcbController.prototype.create)
phcbRouter.put('/create/phcb', PhcbController.prototype.update)
phcbRouter.delete('/delete/phcb/:id', PhcbController.prototype.delete)
phcbRouter.get('/phcb/search', PhcbController.prototype.search)
export { phcbRouter }
