import mongoose from "mongoose";

const Schema= mongoose.Schema;
let User= new Schema({
    ime:{
        type: String
    },prezime:{
        type: String
    },
    korisnickoIme:{
        type: String
    },
    lozinka:{
        type: String
    },
    telefon:{
        type: String
    },email:{
        type: String
    },
    datumRodjenja:{
        type: Date
    },status:{
        type: String
    },
    opis:{
        type: String
    }
    
})
export default mongoose.model('User', User, 'users')