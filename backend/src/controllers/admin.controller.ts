import User from '../models/user';
import Usluga from '../models/usluga';
import Kalendar from '../models/kalendar';
import e, * as express from 'express';
import { log } from 'console';
export class AdminController{

    odobri= (req: express.Request, res: express.Response)=>{
        
       
        Usluga.findOne({'id': req.body.id}, (err,usluga)=>{
            if(usluga){
                usluga.status='a';
                usluga.save();
            }
            else{
                res.json(null);
            }
        })
        
    }

    
    
    dohvatiUsluge=(req: express.Request, res: express.Response)=>{
        Usluga.find({}, (err,usluge)=>{
            if(usluge) res.json(usluge)
           
        })

    }

    potvrdi=(req: express.Request, res: express.Response)=>{
        Usluga.findOne({'id': req.body.id}, (err,usluga)=>{
         
            if(usluga){
                usluga.status='a';
                usluga.save();
                res.json(usluga);
            }
            else{
                res.json(null);
            }
           
        })

    }

}