"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_model_1 = require("../models/auth.model");
class AuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const user = yield auth_model_1.AuthModel.signin(email, password);
                res.status(200).send({ message: 'Succesful sign in', data: user });
            }
            catch (error) {
                res.status(400).send({ message: error.message, data: {} });
            }
        });
    }
    signout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('got to signout controller');
            res.status(200).send({ message: 'signout successful', data: {} });
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map