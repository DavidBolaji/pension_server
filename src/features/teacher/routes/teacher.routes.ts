import { TeacherController } from '../controllers/teacher.controller'
import express from 'express'
const teacherRouter = express.Router()

teacherRouter.get('/teacher', TeacherController.prototype.get)
teacherRouter.post('/teacher', TeacherController.prototype.getUser)
teacherRouter.post('/create/teacher', TeacherController.prototype.create)
teacherRouter.put('/create/teacher', TeacherController.prototype.update)
teacherRouter.put('/teacher/update', TeacherController.prototype.updateOne)
teacherRouter.delete('/delete/teacher/:id', TeacherController.prototype.delete)
teacherRouter.get('/teacher/search', TeacherController.prototype.search)
export { teacherRouter }
