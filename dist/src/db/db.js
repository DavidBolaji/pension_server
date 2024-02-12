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
exports.query = exports.establishDatabaseConnection = exports.con = void 0;
const promise_1 = require("mysql2/promise");
let host = process.env.PROD_HOST;
let user = process.env.PROD_USER;
let pass = process.env.PROD_PASS;
let db = process.env.PROD_DB;
if (process.env.ENV === 'dev') {
    host = process.env.DEV_HOST;
    user = process.env.DEV_USER;
    pass = process.env.DEV_PASS;
    db = process.env.DEV_DB;
}
const pool = (0, promise_1.createPool)({
    host,
    user,
    password: pass,
    database: db,
    connectionLimit: 10,
});
function establishDatabaseConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield pool.getConnection();
            exports.con = connection;
            console.log('Database connection established!');
            connection.release();
        }
        catch (err) {
            console.error(err);
            console.error('Error establishing database connection:', err);
        }
    });
}
exports.establishDatabaseConnection = establishDatabaseConnection;
const query = pool;
exports.query = query;
//# sourceMappingURL=db.js.map