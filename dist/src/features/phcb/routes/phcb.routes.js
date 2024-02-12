"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.phcbRouter = void 0;
const phcb_controller_1 = require("../controllers/phcb.controller");
const express_1 = __importDefault(require("express"));
const phcbRouter = express_1.default.Router();
exports.phcbRouter = phcbRouter;
phcbRouter.get('/phcb', phcb_controller_1.PhcbController.prototype.get);
phcbRouter.post('/phcb', phcb_controller_1.PhcbController.prototype.getUser);
phcbRouter.post('/create/phcb', phcb_controller_1.PhcbController.prototype.create);
phcbRouter.put('/create/phcb', phcb_controller_1.PhcbController.prototype.update);
phcbRouter.delete('/delete/phcb/:id', phcb_controller_1.PhcbController.prototype.delete);
phcbRouter.get('/phcb/search', phcb_controller_1.PhcbController.prototype.search);
//# sourceMappingURL=phcb.routes.js.map