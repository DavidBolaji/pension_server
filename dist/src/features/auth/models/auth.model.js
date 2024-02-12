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
exports.AuthModel = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../../../db/db");
const saltRounds = 10;
class AuthModel {
    static findbyEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT * FROM ${AuthModel.table} WHERE email = ?`;
            try {
                const [result] = yield db_1.query.execute(sql, [email]);
                return result;
            }
            catch (error) {
                // console.log('error fetching')
                console.error(error);
                throw new Error(error.message);
            }
        });
    }
    static storeToken(id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT * FROM ${AuthModel.table} WHERE id = ?`;
            const sql2 = `UPDATE ${AuthModel.table} SET token = ? WHERE id = ?`;
            const newToken = JSON.stringify([{ token }]);
            try {
                const [result] = yield db_1.query.execute(sql, [id]);
                if (result[0].token === null) {
                    yield db_1.query.execute(sql2, [newToken, id]);
                }
                else {
                    let tokenList = result[0].token;
                    const mtokenList = JSON.parse(tokenList);
                    mtokenList.push({ token });
                    yield db_1.query.execute(sql2, [JSON.stringify(mtokenList), id]);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    static signin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = (yield this.findbyEmail(email));
                if (result && result.length > 0) {
                    const passwordMatch = bcryptjs_1.default.compare(password, result[0].password);
                    if (!passwordMatch)
                        throw new Error('invalid credentials');
                    const token = jsonwebtoken_1.default.sign({ id: JSON.stringify(result[0].id) }, process.env.JWT_SECRET);
                    yield this.storeToken(result[0].id, token);
                    return Object.assign(Object.assign({}, result[0]), { token });
                }
                else {
                    throw new Error('invalid credentials');
                }
            }
            catch (error) {
                console.error(error);
                throw new Error(error.message);
            }
        });
    }
    static findAuth(id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT * FROM ${AuthModel.table} WHERE id = ?`;
            try {
                const [result] = yield db_1.query.execute(sql, [id]);
                let holder = result[0].token;
                holder = JSON.parse(holder);
                const tokenExist = holder.filter((t) => t.token === token);
                if (tokenExist.length > 0) {
                    return result[0];
                }
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    static removeToken(id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT * FROM ${AuthModel.table}  WHERE id = ?`;
            try {
                const [result] = yield db_1.query.execute(sql, [id]);
                const holder = JSON.parse(result[0].token);
                const tokenList = holder.filter((t) => t.token !== token);
                this.replaceToken(id, tokenList);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    static replaceToken(id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql2 = `UPDATE ${AuthModel.table} SET token = ? WHERE id = ?`;
            let tokenList = token;
            try {
                const ntokenList = JSON.stringify(tokenList);
                yield db_1.query.execute(sql2, [ntokenList, id]);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.AuthModel = AuthModel;
AuthModel.table = 'auth';
//# sourceMappingURL=auth.model.js.map