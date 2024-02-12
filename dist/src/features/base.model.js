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
exports.BaseModel = void 0;
const db_1 = require("../db/db");
class BaseModel {
    static findAll(path) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = `SELECT * FROM ${path}`;
            try {
                const [result] = yield db_1.query.execute(sql);
                return result;
            }
            catch (error) {
                console.error(error);
                throw new Error(error.message);
            }
        });
    }
    static findOne(path, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = `SELECT * FROM ${path} WHERE staffId = ?`;
            console.log(id);
            try {
                const [result] = yield db_1.query.execute(sql, [id]);
                return result;
            }
            catch (error) {
                console.error(error);
                throw new Error(error.message);
            }
        });
    }
    static delete(path, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = `DELETE FROM ${path} WHERE id = ?`;
            try {
                yield db_1.query.execute(sql, [id]);
            }
            catch (error) {
                console.error(error);
                throw new Error(error.message);
            }
        });
    }
    static create(data, path) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql2 = `INSERT INTO ${path}(`;
            let val = `VALUES(`;
            const updateList = Object.keys(data);
            const update = [
                'staffId',
                'sex',
                'phoneNumber',
                'penNumber',
                'LGA',
                'pfa',
                'amount_pending',
                'amount_paid',
                'amount_expected',
                'attachement1',
                'attachement2',
                'attachement3',
            ];
            const keys = [];
            updateList.forEach((list, ind) => {
                if (update.includes(list)) {
                    if (ind === updateList.length - 1) {
                        sql2 += `${list}) `;
                        val += `?)`;
                    }
                    else {
                        sql2 += `${list}, `;
                        val += `?, `;
                    }
                    keys.push(data[list]);
                }
            });
            sql2 += val;
            console.error(sql2);
            console.log(keys);
            try {
                const [result] = yield db_1.query.execute(sql2, [...keys]);
                console.log(result);
                console.log(result.insertId);
                return { id: result.insertId };
            }
            catch (error) {
                console.log(error.message);
                throw new Error(error.message);
            }
        });
    }
    static update(data, path) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql2 = `UPDATE ${path} SET `;
            const updateList = Object.keys(data);
            const updateFields = [
                'amount_pending',
                'amount_paid',
                'amount_expected',
                'attachement1',
                'attachement2',
                'attachement3',
            ];
            const keys = [];
            let setFields = [];
            updateFields.forEach((field) => {
                if (updateList.includes(field) && data[field] !== null) {
                    //@ts-ignore
                    setFields.push(`${field} = ?`);
                    keys.push(data[field]);
                }
            });
            sql2 += setFields.join(', ');
            sql2 += ` WHERE staffId = ?`;
            console.error(sql2);
            console.log(keys);
            try {
                const [result] = yield db_1.query.execute(sql2, [
                    ...keys,
                    data.staffId,
                ]);
                return { id: result.insertId };
            }
            catch (error) {
                console.log(error.message);
                throw new Error(error.message);
            }
        });
    }
    static search(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
    SELECT staffId
    FROM ${data.path}
    WHERE staffId LIKE ?
  `;
            try {
                const [result] = yield db_1.query.execute(sql, [`%${data.name}%`]);
                return result;
            }
            catch (error) {
                console.error(error);
                throw new Error(error.message);
            }
        });
    }
}
exports.BaseModel = BaseModel;
//# sourceMappingURL=base.model.js.map