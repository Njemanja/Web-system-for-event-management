"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Usluga = new Schema({
    ime: {
        type: String
    }, mesto: {
        type: String
    },
    telefon: {
        type: String
    },
    email: {
        type: String
    },
    galerija: {
        type: Array
    }, stolovi: {
        type: Array
    },
    vrsta: {
        type: String
    },
    korisnickoIme: {
        type: String
    },
    opis: {
        type: String
    },
    id: {
        type: Number
    },
    status: {
        type: String
    },
    video: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Usluga', Usluga, 'usluga');
//# sourceMappingURL=usluga.js.map