"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Prijave = new Schema({
    korisnickoIme: {
        type: String
    },
    idRad: {
        type: Number
    },
    status: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('Prijave', Prijave, 'prijave');
//# sourceMappingURL=prijave.js.map