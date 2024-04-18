"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Flights = new Schema({
    polazak: {
        type: String
    }, dolazak: {
        type: String
    },
    trajanje: {
        type: Number
    },
    brojpresedanja: {
        type: Number
    },
    cenabiznis: {
        type: Number
    }, cenaeko: {
        type: Number
    },
    brojmesta: {
        type: Number
    },
    datum: {
        type: Date
    }
});
exports.default = mongoose_1.default.model('Flights', Flights, 'flights');
//# sourceMappingURL=flights.js.map