"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subebRouter = void 0;
const subeb_controller_1 = require("../controllers/subeb.controller");
const express_1 = __importDefault(require("express"));
const subebRouter = express_1.default.Router();
exports.subebRouter = subebRouter;
subebRouter.get('/subeb', subeb_controller_1.SubebController.prototype.get);
subebRouter.post('/subeb', subeb_controller_1.SubebController.prototype.getUser);
subebRouter.post('/create/subeb', subeb_controller_1.SubebController.prototype.create);
subebRouter.put('/create/subeb', subeb_controller_1.SubebController.prototype.update);
subebRouter.delete('/delete/subeb/:id', subeb_controller_1.SubebController.prototype.delete);
subebRouter.get('/subeb/search', subeb_controller_1.SubebController.prototype.search);
//# sourceMappingURL=subeb.routes.js.map