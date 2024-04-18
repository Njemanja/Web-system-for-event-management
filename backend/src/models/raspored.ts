import mongoose from "mongoose";

const Schema= mongoose.Schema;
let Raspored= new Schema({
    raspored: {
        type: Array
    },
    id: {
        type: String
    }

    
})
export default mongoose.model('Raspored', Raspored, 'raspored')