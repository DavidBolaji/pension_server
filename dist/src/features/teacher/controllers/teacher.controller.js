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
exports.TeacherController = void 0;
const db_two_1 = __importDefault(require("../../../db/db-two"));
class TeacherController {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const teacher = yield db_two_1.default.teacher.findMany({});
                console.log(teacher);
                res
                    .status(200)
                    .send({ message: 'Teacher fetch succesfully', data: teacher });
            }
            catch (error) {
                res.status(500).send({ message: 'Server Error', data: [] });
            }
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body.name);
            try {
                const teacher = yield db_two_1.default.teacher.findFirst({
                    where: {
                        name: req.body.name,
                    },
                });
                res.status(200).send({ message: 'PHCB fetch succesfully', data: teacher });
            }
            catch (error) {
                res.status(500).send({ message: 'Server Error', data: [] });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const teacher = yield db_two_1.default.teacher.create({
                    data: Object.assign({}, req.body),
                });
                res
                    .status(200)
                    .send({ message: 'Subeb create succesfully', data: teacher });
            }
            catch (error) {
                res.status(500).send({ message: 'Server Error', data: [] });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const subeb = yield db_two_1.default.teacher.update({
                    where: {
                        id,
                    },
                    data: Object.assign({}, req.body),
                });
                res.status(200).send({ message: 'Subeb update succesfully', data: subeb });
            }
            catch (error) {
                res.status(500).send({ message: 'Server Error', data: [] });
            }
        });
    }
    updateOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.query;
            const key = Object.keys(req.body);
            const teachers = key.map((k) => __awaiter(this, void 0, void 0, function* () {
                yield db_two_1.default.teacher.update({
                    where: {
                        id: id,
                    },
                    data: {
                        [k]: req.body[k],
                    },
                });
            }));
            try {
                const teacher = yield Promise.all([teachers]);
                res
                    .status(200)
                    .send({ message: 'Teacher update succesful', data: teacher });
            }
            catch (error) {
                console.log(error.message);
                res.status(500).send({ message: 'Server Error', data: [] });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const subeb = yield db_two_1.default.teacher.delete({
                    where: {
                        id,
                    },
                });
                res.status(200).send({ message: 'Subeb update succesfully', data: subeb });
            }
            catch (error) {
                res.status(500).send({ message: 'Server Error', data: [] });
            }
        });
    }
    search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const temp = Object.keys(req.query);
            const search = temp[0];
            const value = req.query[search];
            try {
                const subebUsers = yield db_two_1.default.teacher.findMany({
                    where: {
                        [search]: {
                            contains: value,
                        },
                    },
                });
                res.status(200).send({
                    message: 'Fetch successfull',
                    data: subebUsers ? subebUsers : [],
                });
            }
            catch (error) {
                console.log(error);
                res.status(400).send({ message: error.message, data: [] });
            }
        });
    }
}
exports.TeacherController = TeacherController;
//# sourceMappingURL=teacher.controller.js.map