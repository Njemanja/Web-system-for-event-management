"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let DolazakPotvrda = new Schema({
    hrana: {
        type: Array
    },
    pice: {
        type: Array
    },
    ostalo: {
        type: Array
    },
    pokloni: {
        type: Array
    },
    id: {
        type: Number
    },
    ime: {
        type: String
    }
});
exports.default = mongoose_1.default.model('DolazakPotvrda', DolazakPotvrda, 'dolazakpotvrda');
//# sourceMappingURL=koDolazi.js.map