"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleRouter = void 0;
const middle_controller_1 = require("../controllers/middle.controller");
const express_1 = __importDefault(require("express"));
const middleRouter = express_1.default.Router();
exports.middleRouter = middleRouter;
middleRouter.get('/middle', middle_controller_1.MiddleController.prototype.get);
middleRouter.post('/middle', middle_controller_1.MiddleController.prototype.getUser);
middleRouter.post('/create/middle', middle_controller_1.MiddleController.prototype.create);
middleRouter.put('/create/middle', middle_controller_1.MiddleController.prototype.update);
middleRouter.delete('/delete/middle/:id', middle_controller_1.MiddleController.prototype.delete);
middleRouter.get('/middle/search', middle_controller_1.MiddleController.prototype.search);
//# sourceMappingURL=middle.routes.js.map