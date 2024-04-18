import mongoose from "mongoose";

const Schema= mongoose.Schema;
let Kalendar= new Schema({
    niz: {
        type: Array
    },
    korisnickoIme: {
        type: String
    }

    
})
export default mongoose.model('Kalendar', Kalendar, 'kalendar')