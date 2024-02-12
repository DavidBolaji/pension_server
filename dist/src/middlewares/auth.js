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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_model_1 = require("../features/auth/models/auth.model");
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const header = req.headers['authorization'];
    if (header) {
        const token = header.replace('Bearer ', '');
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!decoded)
            return res.status(401).send({ message: 'Unauthorized' });
        const result = (yield auth_model_1.AuthModel.findAuth(+decoded.id, token));
        if (!result)
            return res.status(401).send({ message: 'Unauthorized' });
        req.authUser = result;
        next();
    }
    else {
        res.status(401).send({ message: 'Unauthorized' });
    }
});
exports.auth = auth;
const signOut = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const header = req.headers['authorization'];
    const token = header === null || header === void 0 ? void 0 : header.replace('Bearer ', '');
    try {
        yield auth_model_1.AuthModel.removeToken((_a = req.authUser) === null || _a === void 0 ? void 0 : _a.id, token);
        next();
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ message: 'An error occured' });
    }
});
exports.signOut = signOut;
//# sourceMappingURL=auth.js.map