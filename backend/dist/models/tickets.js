"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Tickets = new Schema({
    polazak: {
        type: String
    }, dolazak: {
        type: String
    },
    datum: {
        type: Date
    },
    korisnickoIme: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Tickets', Tickets, 'tickets');
//# sourceMappingURL=tickets.js.map