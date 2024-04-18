"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadionicaController = void 0;
const user_1 = __importDefault(require("../models/user"));
const radionica_1 = __importDefault(require("../models/radionica"));
const poruka_1 = __importDefault(require("../models/poruka"));
const lajk_1 = __importDefault(require("../models/lajk"));
const lajk_2 = __importDefault(require("../models/lajk"));
const prijave_1 = __importDefault(require("../models/prijave"));
const koordinate_1 = __importDefault(require("../models/koordinate"));
const obavesti_1 = __importDefault(require("../models/obavesti"));
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
class RadionicaController {
    constructor() {
        this.sveRadionice = (req, res) => {
            radionica_1.default.find({}, (err, radionice) => {
                if (err)
                    console.log(err);
                else
                    res.json(radionice);
            });
        };
        this.pretrazi = (req, res) => {
            let n = req.body.naziv;
            let m = req.body.mesto;
            radionica_1.default.find({ 'naziv': { $regex: req.body.naziv }, 'mesto': { $regex: req.body.mesto } }, (err, radionice) => {
                if (err)
                    console.log(err);
                else
                    res.json(radionice);
            });
        };
        this.mojeRadionice = (req, res) => {
            prijave_1.default.find({ 'korisnickoIme': req.body.korisnickoIme }, (err, prijave) => {
                res.json(prijave);
            });
        };
        this.lajkovi = (req, res) => {
            lajk_1.default.find({ 'korisnickoIme': req.body.korisnickoIme }, (err, data) => {
                res.json(data);
            });
        };
        this.sviLajkovi = (req, res) => {
            lajk_1.default.find({}, (err, data) => {
                res.json(data);
            });
        };
        this.dodajLajk = (req, res) => {
            lajk_1.default.find({ 'idRad': req.body.idRad, 'korisnickoIme': req.body.korisnickoIme }, (err, data) => {
                if (data.length == 0) {
                    res.json("OK");
                    let noviLajk = new lajk_2.default({
                        korisnickoIme: req.body.korisnickoIme,
                        idRad: req.body.idRad
                    });
                    noviLajk.save();
                    radionica_1.default.updateOne({ 'id': req.body.idRad }, { $inc: { 'brojLajkova': 1 } }, (err, data) => {
                    });
                }
            });
        };
        this.obrisiLajk = (req, res) => {
            lajk_1.default.deleteOne({ 'korisnickoIme': req.body.korisnickoIme, 'idRad': req.body.idRad }, (err, data) => {
                radionica_1.default.updateOne({ 'id': req.body.idRad }, { $inc: { 'brojLajkova': -1 } }, (err, data) => {
                });
            });
        };
        this.obrisiKomentar = (req, res) => {
            radionica_1.default.findOne({ 'id': req.body.idRad }, (err, data) => {
                if (data) {
                    data.remove();
                    let nasao = true;
                    for (let i = 0; i < data.komentari.length; i++) {
                        if (data.komentari[i].tekst == req.body.komentar && nasao) {
                            data.komentari.splice(i, 1);
                            nasao = false;
                        }
                    }
                    //console.log(data);
                    const data1 = new radionica_1.default({
                        id: data.id,
                        mesto: data.mesto,
                        datum: data.datum,
                        slika: data.slika,
                        naziv: data.naziv,
                        opis: data.opis,
                        brojLajkova: data.brojLajkova,
                        komentari: data.komentari,
                    });
                    //console.log(data1)
                    data1.save();
                }
            });
        };
        this.azurirajKomentar = (req, res) => {
            radionica_1.default.findOne({ 'id': req.body.idRad }, (err, data) => {
                if (data) {
                    data.remove();
                    let nasao = true;
                    for (let i = 0; i < data.komentari.length; i++) {
                        if (data.komentari[i].tekst == req.body.komentar && nasao) {
                            data.komentari[i].tekst = req.body.noviKomentar;
                            nasao = false;
                        }
                    }
                    console.log(data);
                    const data1 = new radionica_1.default({
                        id: data.id,
                        mesto: data.mesto,
                        datum: data.datum,
                        slika: data.slika,
                        naziv: data.naziv,
                        opis: data.opis,
                        brojLajkova: data.brojLajkova,
                        komentari: data.komentari,
                    });
                    //console.log(data1)
                    data1.save();
                }
            });
        };
        this.poruke = (req, res) => {
            poruka_1.default.find({ 'korisnickoIme1': req.body.korisnickoIme }, (err, data) => {
                if (data) {
                    //log.console(data);
                    res.json(data);
                }
            });
        };
        this.poruke1 = (req, res) => {
            poruka_1.default.find({ 'idRad': req.body.idRad }, (err, data) => {
                if (data) {
                    //log.console(data);
                    res.json(data);
                }
            });
        };
        this.posaljiPoruku = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            poruka_1.default.findOne({ 'idRad': req.body.idRad, "korisnickoIme1": korisnickoIme }, (err, data) => {
                res.json("OK");
                if (data) {
                    data.remove();
                    data.poruke.push(req.body.novaPoruka);
                    const data1 = new poruka_1.default({
                        poruke: data.poruke,
                        korisnickoIme1: data.korisnickoIme1,
                        korisnickoIme2: data.korisnickoIme2,
                        slika1: data.slika1,
                        slika2: data.slika2,
                        idRad: data.idRad,
                        naziv: data.naziv
                    });
                    data1.save();
                }
                else {
                    user_1.default.findOne({ "korisnickoIme": req.body.korisnickoIme }, (err, kor1) => {
                        let slika1 = kor1.slika;
                        let koriscnikoIme1 = req.body.korisnickoIme;
                        radionica_1.default.findOne({ "id": req.body.idRad }, (err, radionica) => {
                            if (radionica) {
                                //console.log(radionica);
                                let naziv = radionica.naziv;
                                user_1.default.findOne({ "korisnickoIme": radionica.organizator }, (err, kor2) => {
                                    let slika2 = kor2.slika;
                                    let koriscnikoIme2 = radionica.organizator;
                                    let poruke = new Array();
                                    poruke.push(req.body.novaPoruka);
                                    const poruka = new poruka_1.default({
                                        poruke: poruke,
                                        korisnickoIme1: koriscnikoIme1,
                                        korisnickoIme2: koriscnikoIme2,
                                        slika1: slika1,
                                        slika2: slika2,
                                        idRad: req.body.idRad,
                                        naziv: naziv
                                    });
                                    //console.log(poruka);
                                    poruka.save();
                                    //res.json({'poruka': 'ok', "orgainzator": koriscnikoIme2});
                                });
                            }
                        });
                    });
                }
            });
        };
        this.obrisiPrijavu = (req, res) => {
            prijave_1.default.deleteOne({ "korisnickoIme": req.body.korisnickoIme, "idRad": req.body.idRad }, (err, data) => {
                radionica_1.default.updateOne({ "id": req.body.idRad }, { $inc: { 'slobodnaMesta': 1 } }, (err, data) => {
                    res.json({ 'poruka': "Uspesno ste obrisali prijavu!" });
                });
            });
        };
        this.svePrijave1 = (req, res) => {
            prijave_1.default.find({}, (err, data) => {
                res.json(data);
            });
        };
        this.svePrijave = (req, res) => {
            prijave_1.default.find({ "korisnickoIme": req.body.korisnickoIme }, (err, data) => {
                res.json(data);
            });
        };
        this.svePrijaveIDRad = (req, res) => {
            prijave_1.default.find({ "idRad": req.body.idRad }, (err, data) => {
                res.json(data);
            });
        };
        this.svaObavestenja = (req, res) => {
            obavesti_1.default.find({ "idRad": req.body.idRad }, (err, data) => {
                res.json(data);
            });
        };
        this.obrisiObavestene = (req, res) => {
            obavesti_1.default.deleteMany({ "idRad": req.body.idRad }, (err, data) => {
                res.json(data);
            });
        };
        this.sacuvajZaObavestenje = (req, res) => {
            let obavetenje = new obavesti_1.default({
                email: req.body.email,
                idRad: req.body.idRad
            });
            obavetenje.save();
        };
        this.prijaviMe = (req, res) => {
            radionica_1.default.updateOne({ "id": req.body.idRad }, { $inc: { 'slobodnaMesta': -1 } }, (err, data) => {
                let prijava = new prijave_1.default({
                    korisnickoIme: req.body.korisnickoIme,
                    idRad: req.body.idRad,
                    datum: req.body.datum,
                    status: 0
                });
                prijava.save();
            });
        };
        this.dodajKomentar = (req, res) => {
            const komentar = {
                "tekst": req.body.tekst,
                "korisnickoIme": req.body.korisnickoIme,
                "datum": req.body.datum,
                "slika": req.body.slika
            };
            radionica_1.default.updateOne({ 'id': req.body.idRad }, { $push: { 'komentari': komentar } }, (err, data) => {
                res.json("OK");
            });
        };
        this.dodajRadionicu = (req, res) => {
            let radionica = new radionica_1.default({
                id: req.body.idRad,
                naziv: req.body.naziv,
                mesto: req.body.mesto,
                datum: req.body.datum,
                duziOpis: req.body.duziOpis,
                opis: req.body.opis,
                komentari: req.body.komentari,
                slika: req.body.slika,
                galerija: req.body.galerija,
                brojLajkova: 0,
                organizator: req.body.organizator,
                status: req.body.status,
                slobodnaMesta: req.body.slobodnaMesta
            });
            radionica.save();
            res.json({ 'poruka': "Uspesno ste dodali radionicu" });
            //novaRadionica.save()
        };
        this.prihvatiRadionicu = (req, res) => {
            user_1.default.findOne({ "korisnickoIme": req.body.korisnickoIme }, (err, user) => {
                user.remove();
                let user1 = new user_1.default({ ime: user.ime,
                    prezime: user.prezime,
                    korisnickoIme: user.korisnickoIme,
                    lozinka: user.lozinka,
                    telefon: user.telefon,
                    email: user.email,
                    nazivOrganizacije: user.nazivOrganizacije,
                    drzava: user.drzava,
                    grad: user.grad,
                    postanskiBroj: user.postanskiBroj,
                    ulica: user.ulica,
                    broj: user.broj,
                    maticniBrojOrganizacije: user.maticniBrojOrganizacije,
                    tip: 2,
                    status: user.status,
                    slika: user.slika
                });
                //console.log(user1);
                user1.save();
            });
            radionica_1.default.updateOne({ "id": req.body.idRad }, { $set: { "status": 1 } }, (err, user) => {
            });
        };
        this.obrisiRadionicu = (req, res) => {
            radionica_1.default.deleteOne({ "id": req.body.idRad }, (err, user) => {
                /**I iz stalih tabela */
            });
        };
        this.azurirajRadionicu = (req, res) => {
            let parametar = req.body.parametar;
            radionica_1.default.findOne({ "id": req.body.idRad }, (resp, rad) => {
                if (rad) {
                    radionica_1.default.updateOne({ "id": req.body.idRad }, { $set: { [parametar]: req.body.novaVrednost } }, (resp) => {
                        res.json("Uspesno ste promenili " + parametar + "!");
                    });
                }
                else {
                    res.json("Radionica sa ID " + req.body.idRad + " ne postoji!");
                }
            });
        };
        this.sveKoordinate = (req, res) => {
            koordinate_1.default.find({}, (err, koordinate) => {
                if (err)
                    console.log(err);
                else
                    res.json(koordinate);
            });
        };
        this.prihvatiPrijavu = (req, res) => {
            prijave_1.default.collection.updateOne({ "idRad": req.body.idRad, "korisnickoIme": req.body.koriscnikoIme }, { $set: { "status": 1 } }, () => {
            });
            radionica_1.default.updateOne({ "id": req.body.idRad }, { $inc: { "slobodnaMesta": -1 } }, (err, user) => {
            });
        };
    }
    posaljiZaOtkazivanje(req, res) {
        radionica_1.default.updateOne({ "id": req.body.idRad }, { $set: { "status": 0 } }, (err, user) => {
        });
        radionica_1.default.updateOne({ "id": req.body.idRad }, { $set: { "naziv": "Otkazana" } }, (err, user) => {
        });
        prijave_1.default.deleteMany({ "idRad": req.body.idRad }, () => {
        });
        var nodemailer = require('nodemailer');
        var transporter = nodemailer.createTransport({
            service: 'outlook',
            auth: {
                user: "krivokapicnemanja00@outlook.com",
                pass: 'Piaprojekat2022!'
            }
        });
        var mailOptions = {
            from: "krivokapicnemanja00@outlook.com",
            to: req.body.email,
            subject: 'Oktazivanje radionice',
            text: "Radionica " + req.body.idRad + ". je otkazana"
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
}
exports.RadionicaController = RadionicaController;
//# sourceMappingURL=radionica.controller.js.map