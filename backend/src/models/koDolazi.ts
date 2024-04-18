import mongoose from "mongoose";

const Schema= mongoose.Schema;
let DolazakPotvrda= new Schema({
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

    
})
export default mongoose.model('DolazakPotvrda', DolazakPotvrda, 'dolazakpotvrda')