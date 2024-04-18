import User from '../models/user';
import Usluga from '../models/usluga';
import Kalendar from '../models/kalendar';
import e, * as express from 'express';
import { log } from 'console';
import mojDogadjaj from '../models/mojDogadjaj';
import Dolazak from '../models/dolazak';
import DolazakPotvrda from '../models/koDolazi';
import koDolazi from '../models/koDolazi';
import Raspored from '../models/raspored';
let id=0;
let idDog=0;
export class UserController{
    login= (req: express.Request, res: express.Response)=>{
        
        let lozinka= req.body.lozinka;
        let korisnickoIme= req.body.korisnickoIme;
        User.findOne({'korisnickoIme': korisnickoIme, 'lozinka': lozinka}, (err,user)=>{
            if(user)  res.json(user);
            else{
                res.json(null);
            }
        })
        
    }
    
    register=(req: express.Request, res: express.Response)=>{
        User.findOne({'korisnickoIme': req.body.korisnickoIme}, (err,user)=>{
            if(user) res.json({'poruka': '2'})
            else{
                User.findOne({'email': req.body.email}, (err,user)=>{
                    if(user) res.json({'poruka': '2'});
                    else{
                        let user= new User({ime: req.body.ime,
                            prezime: req.body.prezime,
                            korisnickoIme: req.body.korisnickoIme,
                            lozinka: req.body.lozinka,
                            telefon: req.body.telefon,
                            email: req.body.email,
                            datum: req.body.datumRodjenja,
                            status: req.body.status
                        })
                        user.save().then(user=>{
                            res.status(200).json({'poruka': '1'});
                        }).catch(err=> {res.status(400).json({'poruka': '0'})})
                    }
                })
        
            }
        })

    }




  

    support=async (req: express.Request, res: express.Response)=>{
        User.findOne({'korisnickoIme': req.body.korisnickoIme}, (err,user)=>{
            if(user){
                var text=req.body.text+"\n\n\n"+"FROM: "+req.body.mail
                var nodemailer = require('nodemailer');
                var transporter = nodemailer.createTransport({
                service: 'outlook',
                auth: {
                    user: "suppairuser@outlook.com",
                    pass: 'Airsuppuser'
                },
                tls: {
                    rejectUnauthorized: false 
                }
                });
                var mailOptions = {
                from: "suppairuser@outlook.com",
                to: "kn190588d@student.etf.bg.ac.rs",
                subject: 'Support',
                text:  text
                };
        
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                    });
                
                
            }
           
        })
        
           
    }

    izmeniUslugu=(req: express.Request, res: express.Response)=>{
        Usluga.findOne({'id': req.body.id}, (err,usluga)=>{
          
            if(usluga){
                usluga.ime= req.body.ime,
                usluga.mesto= req.body.mesto,
                usluga.email= req.body.email,
                usluga.telefon=  req.body.telefon,
                usluga.galerija= req.body.galerija,
                usluga.vrsta= req.body.vrsta,
                usluga.stolovi= req.body.stolovi,
                usluga.opis= req.body.opis,

                usluga.save()
            }
            
           
        })

    }


    dodajUslugu(req: express.Request, res: express.Response){
        let usluga= new Usluga({
            ime: req.body.ime,
            mesto: req.body.mesto,
            email: req.body.email,
            telefon: req.body.telefon,
            galerija: req.body.galerija,
            vrsta: req.body.vrsta,
            stolovi: req.body.stolovi,
            opis: req.body.opis,
            korisnickoIme: req.body.korisnickoIme,
            id: id,
            video: req.body.video,
            status: 'p' /* pendding, approved, deleted */
        })
        id+=1;
        usluga.save()

    }



    dohvatiKorisnika=(req: express.Request, res: express.Response)=>{
        User.findOne({'korisnickoIme': req.body.korisnickoIme}, (err,user)=>{
            if(user) res.json(user)
           
        })

    }

    dohvatiUsluge=(req: express.Request, res: express.Response)=>{
        Usluga.find({'korisnickoIme': req.body.korisnickoIme}, (err,usluge)=>{
            if(usluge) res.json(usluge)
           
        })

    }

    dodajKalendar=(req: express.Request, res: express.Response)=>{
        Kalendar.findOne({'korisnickoIme': req.body.korisnickoIme}, (err,kalendar)=>{
            
            if(kalendar){
                
                kalendar.niz=req.body.kalendar;
                kalendar.save();
            }
            else{
                let k= new Kalendar({
                    korisnickoIme: req.body.korisnickoIme,
                    niz: req.body.kalendar
                });
                k.save()
            }
           
        })

    }

    dohvatiKalendar=(req: express.Request, res: express.Response)=>{
        Kalendar.findOne({'korisnickoIme': req.body.korisnickoIme}, (err,kalendar)=>{
            
            if(kalendar){
              res.json(kalendar)
            }
            else{
                res.json(null);
            }
           
        })

    }

    dohvatiUslugu=(req: express.Request, res: express.Response)=>{
        Usluga.findOne({'id': req.body.id}, (err,usluga)=>{
            
            if(usluga){
              res.json(usluga)
            }
            else{
                res.json(null);
            }
           
        })

    }

    dohvatiSveUsluge=(req: express.Request, res: express.Response)=>{
        Usluga.find({}, (err,usluga)=>{
            
            if(usluga){
              res.json(usluga)
            }
            else{
                res.json(null);
            }
           
        })

    }



    izmeniInformacije=(req: express.Request, res: express.Response)=>{
        User.findOne({'korisnickoIme': req.body.korisnickoIme}, (err,user)=>{
            if(user && (user.korisnickoIme!=req.body.korisnickoIme)) res.json({'poruka': '2'})
            else{
                User.findOne({'email': req.body.email}, (err,user)=>{
                    if(user && (user.email!=req.body.email)) res.json({'poruka': '2'});
                    else{
                        if(user.korisnickoIme!=req.body.korisnickoIme){
                            Usluga.updateMany({ korisnickoIme:  user.korisnickoIme}, { korisnickoIme: req.body.korisnickoIme }, (err, result) => {
                                
                            });
                        }
                        user.ime= req.body.ime,
                        user.prezime= req.body.prezime,
                        user.korisnickoIme= req.body.korisnickoIme,
                        user.lozinka= req.body.lozinka,
                        user.telefon= req.body.telefon,
                        user.email= req.body.email,
                        
                    
                        res.json({'poruka': '1'});
                        user.save();
                    }
                })
        
            }
        })

    }

    napraviDogadjaj=(req: express.Request, res: express.Response)=>{
        let user= new mojDogadjaj({
            naziv: req.body.naziv,
            mesto: req.body.mesto,
            vreme: req.body.vreme,
            limit: req.body.limit,
            telefon: req.body.telefon,
            opis: req.body.opis,
            osobe: req.body.osobe,
            hrana: req.body.hrana,
            pice: req.body.pice,
            ostalo: req.body.ostalo,
            zelje: req.body.zelje,
            ulica: req.body.ulica,
            id: idDog,
            korisnickoIme: req.body.korisnickoIme,
            idMesta: req.body.idMesta
        })
        idDog+=1;
        user.save()

    }

    mojiDogadjaji=(req: express.Request, res: express.Response)=>{
        mojDogadjaj.find({"korisnickoIme": req.body.korisnickoIme}, (err,dogadjaji)=>{
          

            if(dogadjaji){
              res.json(dogadjaji)
            }
            else{
                res.json(null);
            }
           
        })
    }

    dolazak=(req: express.Request, res: express.Response)=>{
        Dolazak.find({"id": req.body.id}, (err,dolazak)=>{
          

            if(dolazak){
              res.json(dolazak)
            }
            else{
                res.json(null);
            }
           
        })
    }

    potvrdiDolazak=(req: express.Request, res: express.Response)=>{
        Dolazak.find({"id": req.body.id}, (err,dolazak)=>{
          

            if(dolazak){
              dolazak.dolaze.push({
                email: req.body.email,
                ime: req.body.email
              })
            }
            else{
                res.json(null);
            }
           
        })
    }



    posaljiPozivnicu = (req: express.Request, res: express.Response) => {
        let email=req.body.email
        console.log(email);
        //console.log(req.body.link);
        var nodemailer = require('nodemailer');
        var transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            user: "suppairuser@outlook.com",
            pass: 'Airsuppuser'
        },
        tls: {
            rejectUnauthorized: false 
        }
        });
        var mailOptions = {
        from: "suppairuser@outlook.com",
        to: email,
        subject: 'Pozivnica',
        html: `
        <p>Link za upitnik: ${req.body.link}</p>
        <img src="${req.body.qr}" alt="QR kod">
        <p>Link za raspored: ${req.body.raspored}</p>
      `,
        };

        transporter.sendMail(mailOptions, function(error, info){});
    
    }
      
    dolazim=(req: express.Request, res: express.Response)=>{
       let pokloni= req.body.pokloni;
       mojDogadjaj.findOne({"id": req.body.id}, (err,dolazak)=>{
       

       
        for (let i = 0; i < pokloni.length; i++) {
            let poklon = pokloni[i];   
            let index=dolazak.zelje.indexOf(poklon);     
            if (index === -1) {
              
              pokloni.splice(i, 1);
              i--;
              
            }else{
                dolazak.zelje.splice(index, 1);
                console.log(dolazak.zelje);
                dolazak.save();
            }
          }
         
        res.json(pokloni);
       })
       
       let d=new DolazakPotvrda({
            id: req.body.id,
            hrana: req.body.hrana,
            pice: req.body.pice,
            ostalo: req.body.ostalo,
            pokloni: pokloni,
            ime: req.body.ime
       });

       d.save();
    }

    spisakGostiju=(req: express.Request, res: express.Response)=>{
        koDolazi.find({"id": req.body.id}, (err,gosti)=>{
            if(gosti){
                res.json(gosti);
              }
              else{
                  res.json(null);
              }
        })
 
 
        
     }

     raspored=(req: express.Request, res: express.Response)=>{
        Raspored.findOne({"id": req.body.id}, (err,r)=>{
        if(r){
            r.raspored=req.body.raspored;
            r.save();
        }else{
            let r1= new Raspored({
                id: req.body.id,
                raspored: req.body.raspored
            })
            r1.save();
        }
            
        })
       
 
        
     }


     dohvatiRaspored=(req: express.Request, res: express.Response)=>{
        Raspored.findOne({"id": req.body.id}, (err,r)=>{
        if(r){
           res.json(r);
        }else{
            res.json(null);
        }
            
        })
       
 
        
     }


}