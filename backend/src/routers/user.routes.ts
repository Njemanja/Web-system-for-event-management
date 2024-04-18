import express from 'express'
import { UserController } from '../controllers/user.controller';


const userRouter= express.Router();

userRouter.route('/login').post(
    (req,res)=> new UserController().login(req, res)
)
userRouter.route('/register').post(
    (req,res)=> new UserController().register(req, res)
)

userRouter.route('/support').post(
    (req,res)=> new UserController().support(req, res)
)
userRouter.route('/dodajUslugu').post(
    (req,res)=> new UserController().dodajUslugu(req, res)
)
userRouter.route('/dohvatiKorisnika').post(
    (req,res)=> new UserController().dohvatiKorisnika(req, res)
)
userRouter.route('/dohvatiUsluge').post(
    (req,res)=> new UserController().dohvatiUsluge(req, res)
)

userRouter.route('/izmeniInformacije').post(
    (req,res)=> new UserController().izmeniInformacije(req, res)
)

userRouter.route('/dodajKalendar').post(
    (req,res)=> new UserController().dodajKalendar(req, res)
)

userRouter.route('/dohvatiKalendar').post(
    (req,res)=> new UserController().dohvatiKalendar(req, res)
)

userRouter.route('/dohvatiUslugu').post(
    (req,res)=> new UserController().dohvatiUslugu(req, res)
)
userRouter.route('/izmeniUslugu').post(
    (req,res)=> new UserController().izmeniUslugu(req, res)
)

userRouter.route('/dohvatiSveUsluge').post(
    (req,res)=> new UserController().dohvatiSveUsluge(req, res)
)

userRouter.route('/napraviDogadjaj').post(
    (req,res)=> new UserController().napraviDogadjaj(req, res)
)

userRouter.route('/mojiDogadjaji').post(
    (req,res)=> new UserController().mojiDogadjaji(req, res)
)

userRouter.route('/dolazak').post(
    (req,res)=> new UserController().dolazak(req, res)
)

userRouter.route('/potvrdiDolazak').post(
    (req,res)=> new UserController().potvrdiDolazak(req, res)
)

userRouter.route('/pozivnica').post(
   
    (req,res)=> new UserController().posaljiPozivnicu(req, res)
)

userRouter.route('/dolazim').post(
   
    (req,res)=> new UserController().dolazim(req, res)
)

userRouter.route('/gosti').post(
   
    (req,res)=> new UserController().spisakGostiju(req, res)
)

userRouter.route('/raspored').post(
   
    (req,res)=> new UserController().raspored(req, res)
)

userRouter.route('/dohvatiRaspored').post(
   
    (req,res)=> new UserController().dohvatiRaspored(req, res)
)


export default userRouter;