"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Radionica = new Schema({
    /*_id:{
        type: ObjectId
    },*/
    id: {
        type: Number
    },
    naziv: {
        type: String
    },
    datum: {
        type: Date
    },
    mesto: {
        type: String
    },
    opis: {
        type: String
    },
    duziOpis: {
        type: String
    },
    slika: {
        type: String
    },
    brojLajkova: {
        type: Number
    },
    komentari: {
        type: Array
    },
    galerija: {
        type: Array
    },
    status: {
        type: Number
    },
    organizator: {
        type: String
    },
    slobodnaMesta: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('Radionica', Radionica, 'radionica');
//# sourceMappingURL=radionica.js.map