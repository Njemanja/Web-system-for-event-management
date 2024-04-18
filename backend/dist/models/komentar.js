"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Komentar = new Schema({
    korisnickoIme: {
        type: String
    },
    tekst: {
        type: Array
    },
});
exports.default = mongoose_1.default.model('Komentar', Komentar, 'komentar');
//# sourceMappingURL=komentar.js.map