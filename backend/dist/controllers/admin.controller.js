"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const usluga_1 = __importDefault(require("../models/usluga"));
class AdminController {
    constructor() {
        this.odobri = (req, res) => {
            usluga_1.default.findOne({ 'id': req.body.id }, (err, usluga) => {
                if (usluga) {
                    usluga.status = 'a';
                    usluga.save();
                }
                else {
                    res.json(null);
                }
            });
        };
        this.dohvatiUsluge = (req, res) => {
            usluga_1.default.find({}, (err, usluge) => {
                if (usluge)
                    res.json(usluge);
            });
        };
        this.potvrdi = (req, res) => {
            usluga_1.default.findOne({ 'id': req.body.id }, (err, usluga) => {
                if (usluga) {
                    usluga.status = 'a';
                    usluga.save();
                    res.json(usluga);
                }
                else {
                    res.json(null);
                }
            });
        };
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map