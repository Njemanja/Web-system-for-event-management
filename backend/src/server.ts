import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import userRouter from './routers/user.routes';
import adminRouter from './routers/admin.routes';



const app = express();
app.use(cors());
//app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

mongoose.connect('mongodb://127.0.0.1:27017/celebratesmart')
const connection=mongoose.connection;
connection.once('open', ()=>{
    console.log('db connection ok')
})

const router=express.Router();
router.use('/users', userRouter)
router.use('/admin', adminRouter)
app.use('/', router)

app.listen(4000, () => console.log(`Express server running on port 4000`));