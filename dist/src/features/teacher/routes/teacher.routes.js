"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teacherRouter = void 0;
const teacher_controller_1 = require("../controllers/teacher.controller");
const express_1 = __importDefault(require("express"));
const teacherRouter = express_1.default.Router();
exports.teacherRouter = teacherRouter;
teacherRouter.get('/teacher', teacher_controller_1.TeacherController.prototype.get);
teacherRouter.post('/teacher', teacher_controller_1.TeacherController.prototype.getUser);
teacherRouter.post('/create/teacher', teacher_controller_1.TeacherController.prototype.create);
teacherRouter.put('/create/teacher', teacher_controller_1.TeacherController.prototype.update);
teacherRouter.put('/teacher/update', teacher_controller_1.TeacherController.prototype.updateOne);
teacherRouter.delete('/delete/teacher/:id', teacher_controller_1.TeacherController.prototype.delete);
teacherRouter.get('/teacher/search', teacher_controller_1.TeacherController.prototype.search);
//# sourceMappingURL=teacher.routes.js.map