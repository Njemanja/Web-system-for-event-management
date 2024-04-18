import mongoose from "mongoose";

const Schema= mongoose.Schema;
let Dolazak= new Schema({
    dolaze: {
        type: Array
    },
    id: {
        type: Number
    }

    
})
export default mongoose.model('Dolazak', Dolazak, 'dolazak')