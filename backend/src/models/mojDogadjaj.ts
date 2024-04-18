import mongoose from "mongoose";

const Schema= mongoose.Schema;
let MojDogadjaj= new Schema({
    naziv:{
        type: String
    },mesto:{
        type: String
    },
    vreme:{
        type: Date
    },
    limit:{
        type: Date
    },
    opis:{
        type: String
    },
    osobe:{
        type: Array
    },
    hrana:{
        type: Array
    },
    pice:{
        type: Array
    },
    ostalo:{
        type: Array
    }, zelje:{
        type: Array
    }, ulica:{
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
})
export default mongoose.model('MojDogadjaj', MojDogadjaj, 'mojdogadjaj')


