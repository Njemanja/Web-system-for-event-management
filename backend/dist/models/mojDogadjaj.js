"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let MojDogadjaj = new Schema({
    naziv: {
        type: String
    }, mesto: {
        type: String
    },
    vreme: {
        type: Date
    },
    limit: {
        type: Date
    },
    opis: {
        type: String
    },
    osobe: {
        type: Array
    },
    hrana: {
        type: Array
    },
    pice: {
        type: Array
    },
    ostalo: {
        type: Array
    }, zelje: {
        type: Array
    }, ulica: {
        type: String
    },
    id: {
        type: Number
    },
    korisnickoIme: {
        type: String
    },
    idMesta: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('MojDogadjaj', MojDogadjaj, 'mojdogadjaj');
//# sourceMappingURL=mojDogadjaj.js.map