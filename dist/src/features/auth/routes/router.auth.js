"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const auth_1 = require("../../../middlewares/auth");
const authRouter = express_1.default.Router();
exports.authRouter = authRouter;
authRouter.post('/auth/login', auth_controller_1.AuthController.prototype.login);
authRouter.get('/auth/signout', auth_1.auth, auth_1.signOut, auth_controller_1.AuthController.prototype.signout);
//# sourceMappingURL=router.auth.js.map