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
exports.LgaController = void 0;
const base_model_1 = require("../../base.model");
class LgaController {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lga = yield base_model_1.BaseModel.findAll('lga');
                res.status(200).send({ message: 'LGA fetch succesfully', data: lga });
            }
            catch (error) {
                res.status(500).send({ message: 'Server Error', data: [] });
            }
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body.staffId);
            try {
                const lga = yield base_model_1.BaseModel.findOne('lga', req.body.staffId);
                res.status(200).send({ message: 'LGA fetch succesfully', data: lga });
            }
            catch (error) {
                res.status(500).send({ message: 'Server Error', data: [] });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lga = yield base_model_1.BaseModel.create(Object.assign({}, req.body), 'lga');
                res.status(200).send({ message: 'LGA create succesfully', data: lga });
            }
            catch (error) {
                res.status(500).send({ message: 'Server Error', data: [] });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lga = yield base_model_1.BaseModel.update(Object.assign({}, req.body), 'lga');
                res.status(200).send({ message: 'LGA update succesfully', data: lga });
            }
            catch (error) {
                res.status(500).send({ message: 'Server Error', data: [] });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const lga = yield base_model_1.BaseModel.delete('lga', +id);
                res.status(200).send({ message: 'LGA update succesfully', data: lga });
            }
            catch (error) {
                res.status(500).send({ message: 'Server Error', data: [] });
            }
        });
    }
    search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = req.query.name;
            try {
                const lgaUsers = yield base_model_1.BaseModel.search({ name, path: 'lga' });
                res
                    .status(200)
                    .send({ message: 'Fetch successfull', data: lgaUsers ? lgaUsers : [] });
            }
            catch (error) {
                console.log(error);
                res.status(400).send({ message: error.message, data: [] });
            }
        });
    }
}
exports.LgaController = LgaController;
//# sourceMappingURL=lga.controller.js.map