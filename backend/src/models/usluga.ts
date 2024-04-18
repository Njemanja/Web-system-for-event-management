import { FILE } from "dns";
import mongoose from "mongoose";

const Schema= mongoose.Schema;
let Usluga= new Schema({
    ime:{
        type: String
    },mesto:{
        type: String
    },
    telefon:{
        type: String
    },
    email:{
        type: String
    },
    galerija:{
        type: Array
    },stolovi:{
        type: Array
    },
    vrsta:{
        type: String
    },
    korisnickoIme:{
        type: String
    },
    opis:{
        type: String
    },
    id:{
        type: Number
    },
    status:{
        type: String
    },
    video:{
        type: String
    }
})
export default mongoose.model('Usluga', Usluga, 'usluga')