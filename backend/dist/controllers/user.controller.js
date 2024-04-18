"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
const usluga_1 = __importDefault(require("../models/usluga"));
const kalendar_1 = __importDefault(require("../models/kalendar"));
const mojDogadjaj_1 = __importDefault(require("../models/mojDogadjaj"));
const dolazak_1 = __importDefault(require("../models/dolazak"));
const koDolazi_1 = __importDefault(require("../models/koDolazi"));
const koDolazi_2 = __importDefault(require("../models/koDolazi"));
const raspored_1 = __importDefault(require("../models/raspored"));
let id = 0;
let idDog = 0;
class UserController {
    constructor() {
        this.login = (req, res) => {
            let lozinka = req.body.lozinka;
            let korisnickoIme = req.body.korisnickoIme;
            user_1.default.findOne({ 'korisnickoIme': korisnickoIme, 'lozinka': lozinka }, (err, user) => {
                if (user)
                    res.json(user);
                else {
                    res.json(null);
                }
            });
        };
        this.register = (req, res) => {
            user_1.default.findOne({ 'korisnickoIme': req.body.korisnickoIme }, (err, user) => {
                if (user)
                    res.json({ 'poruka': '2' });
                else {
                    user_1.default.findOne({ 'email': req.body.email }, (err, user) => {
                        if (user)
                            res.json({ 'poruka': '2' });
                        else {
                            let user = new user_1.default({ ime: req.body.ime,
                                prezime: req.body.prezime,
                                korisnickoIme: req.body.korisnickoIme,
                                lozinka: req.body.lozinka,
                                telefon: req.body.telefon,
                                email: req.body.email,
                                datum: req.body.datumRodjenja,
                                status: req.body.status
                            });
                            user.save().then(user => {
                                res.status(200).json({ 'poruka': '1' });
                            }).catch(err => { res.status(400).json({ 'poruka': '0' }); });
                        }
                    });
                }
            });
        };
        this.support = (req, res) => __awaiter(this, void 0, void 0, function* () {
            user_1.default.findOne({ 'korisnickoIme': req.body.korisnickoIme }, (err, user) => {
                if (user) {
                    var text = req.body.text + "\n\n\n" + "FROM: " + req.body.mail;
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
                        text: text
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                }
            });
        });
        this.izmeniUslugu = (req, res) => {
            usluga_1.default.findOne({ 'id': req.body.id }, (err, usluga) => {
                if (usluga) {
                    usluga.ime = req.body.ime,
                        usluga.mesto = req.body.mesto,
                        usluga.email = req.body.email,
                        usluga.telefon = req.body.telefon,
                        usluga.galerija = req.body.galerija,
                        usluga.vrsta = req.body.vrsta,
                        usluga.stolovi = req.body.stolovi,
                        usluga.opis = req.body.opis,
                        usluga.save();
                }
            });
        };
        this.dohvatiKorisnika = (req, res) => {
            user_1.default.findOne({ 'korisnickoIme': req.body.korisnickoIme }, (err, user) => {
                if (user)
                    res.json(user);
            });
        };
        this.dohvatiUsluge = (req, res) => {
            usluga_1.default.find({ 'korisnickoIme': req.body.korisnickoIme }, (err, usluge) => {
                if (usluge)
                    res.json(usluge);
            });
        };
        this.dodajKalendar = (req, res) => {
            kalendar_1.default.findOne({ 'korisnickoIme': req.body.korisnickoIme }, (err, kalendar) => {
                if (kalendar) {
                    kalendar.niz = req.body.kalendar;
                    kalendar.save();
                }
                else {
                    let k = new kalendar_1.default({
                        korisnickoIme: req.body.korisnickoIme,
                        niz: req.body.kalendar
                    });
                    k.save();
                }
            });
        };
        this.dohvatiKalendar = (req, res) => {
            kalendar_1.default.findOne({ 'korisnickoIme': req.body.korisnickoIme }, (err, kalendar) => {
                if (kalendar) {
                    res.json(kalendar);
                }
                else {
                    res.json(null);
                }
            });
        };
        this.dohvatiUslugu = (req, res) => {
            usluga_1.default.findOne({ 'id': req.body.id }, (err, usluga) => {
                if (usluga) {
                    res.json(usluga);
                }
                else {
                    res.json(null);
                }
            });
        };
        this.dohvatiSveUsluge = (req, res) => {
            usluga_1.default.find({}, (err, usluga) => {
                if (usluga) {
                    res.json(usluga);
                }
                else {
                    res.json(null);
                }
            });
        };
        this.izmeniInformacije = (req, res) => {
            user_1.default.findOne({ 'korisnickoIme': req.body.korisnickoIme }, (err, user) => {
                if (user && (user.korisnickoIme != req.body.korisnickoIme))
                    res.json({ 'poruka': '2' });
                else {
                    user_1.default.findOne({ 'email': req.body.email }, (err, user) => {
                        if (user && (user.email != req.body.email))
                            res.json({ 'poruka': '2' });
                        else {
                            if (user.korisnickoIme != req.body.korisnickoIme) {
                                usluga_1.default.updateMany({ korisnickoIme: user.korisnickoIme }, { korisnickoIme: req.body.korisnickoIme }, (err, result) => {
                                });
                            }
                            user.ime = req.body.ime,
                                user.prezime = req.body.prezime,
                                user.korisnickoIme = req.body.korisnickoIme,
                                user.lozinka = req.body.lozinka,
                                user.telefon = req.body.telefon,
                                user.email = req.body.email,
                                res.json({ 'poruka': '1' });
                            user.save();
                        }
                    });
                }
            });
        };
        this.napraviDogadjaj = (req, res) => {
            let user = new mojDogadjaj_1.default({
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
            });
            idDog += 1;
            user.save();
        };
        this.mojiDogadjaji = (req, res) => {
            mojDogadjaj_1.default.find({ "korisnickoIme": req.body.korisnickoIme }, (err, dogadjaji) => {
                if (dogadjaji) {
                    res.json(dogadjaji);
                }
                else {
                    res.json(null);
                }
            });
        };
        this.dolazak = (req, res) => {
            dolazak_1.default.find({ "id": req.body.id }, (err, dolazak) => {
                if (dolazak) {
                    res.json(dolazak);
                }
                else {
                    res.json(null);
                }
            });
        };
        this.potvrdiDolazak = (req, res) => {
            dolazak_1.default.find({ "id": req.body.id }, (err, dolazak) => {
                if (dolazak) {
                    dolazak.dolaze.push({
                        email: req.body.email,
                        ime: req.body.email
                    });
                }
                else {
                    res.json(null);
                }
            });
        };
        this.posaljiPozivnicu = (req, res) => {
            let email = req.body.email;
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
            transporter.sendMail(mailOptions, function (error, info) { });
        };
        this.dolazim = (req, res) => {
            let pokloni = req.body.pokloni;
            mojDogadjaj_1.default.findOne({ "id": req.body.id }, (err, dolazak) => {
                for (let i = 0; i < pokloni.length; i++) {
                    let poklon = pokloni[i];
                    let index = dolazak.zelje.indexOf(poklon);
                    if (index === -1) {
                        pokloni.splice(i, 1);
                        i--;
                    }
                    else {
                        dolazak.zelje.splice(index, 1);
                        console.log(dolazak.zelje);
                        dolazak.save();
                    }
                }
                res.json(pokloni);
            });
            let d = new koDolazi_1.default({
                id: req.body.id,
                hrana: req.body.hrana,
                pice: req.body.pice,
                ostalo: req.body.ostalo,
                pokloni: pokloni,
                ime: req.body.ime
            });
            d.save();
        };
        this.spisakGostiju = (req, res) => {
            koDolazi_2.default.find({ "id": req.body.id }, (err, gosti) => {
                if (gosti) {
                    res.json(gosti);
                }
                else {
                    res.json(null);
                }
            });
        };
        this.raspored = (req, res) => {
            raspored_1.default.findOne({ "id": req.body.id }, (err, r) => {
                if (r) {
                    r.raspored = req.body.raspored;
                    r.save();
                }
                else {
                    let r1 = new raspored_1.default({
                        id: req.body.id,
                        raspored: req.body.raspored
                    });
                    r1.save();
                }
            });
        };
        this.dohvatiRaspored = (req, res) => {
            raspored_1.default.findOne({ "id": req.body.id }, (err, r) => {
                if (r) {
                    res.json(r);
                }
                else {
                    res.json(null);
                }
            });
        };
    }
    dodajUslugu(req, res) {
        let usluga = new usluga_1.default({
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
        });
        id += 1;
        usluga.save();
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map