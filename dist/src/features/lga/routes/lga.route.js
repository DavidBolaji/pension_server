"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lgaRouter = void 0;
const lga_controller_1 = require("../controllers/lga.controller");
const express_1 = __importDefault(require("express"));
const lgaRouter = express_1.default.Router();
exports.lgaRouter = lgaRouter;
lgaRouter.get('/lga', lga_controller_1.LgaController.prototype.get);
lgaRouter.post('/lga', lga_controller_1.LgaController.prototype.getUser);
lgaRouter.post('/create/lga', lga_controller_1.LgaController.prototype.create);
lgaRouter.put('/lga/update', lga_controller_1.LgaController.prototype.update);
lgaRouter.delete('/delete/lga/:id', lga_controller_1.LgaController.prototype.delete);
lgaRouter.get('/lga/search', lga_controller_1.LgaController.prototype.search);
//# sourceMappingURL=lga.route.js.map