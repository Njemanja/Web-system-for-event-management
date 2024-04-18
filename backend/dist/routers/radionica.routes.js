"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const radionica_controller_1 = require("../controllers/radionica.controller");
const radionicaRouter = express_1.default.Router();
radionicaRouter.route('/sve').get((req, res) => new radionica_controller_1.RadionicaController().sveRadionice(req, res));
radionicaRouter.route('/pretrazi').post((req, res) => new radionica_controller_1.RadionicaController().pretrazi(req, res));
radionicaRouter.route('/moje').post((req, res) => new radionica_controller_1.RadionicaController().mojeRadionice(req, res));
radionicaRouter.route('/lajkovi').post((req, res) => new radionica_controller_1.RadionicaController().lajkovi(req, res));
radionicaRouter.route('/obrisiLajk').post((req, res) => new radionica_controller_1.RadionicaController().obrisiLajk(req, res));
radionicaRouter.route('/azurirajKomentar').post((req, res) => new radionica_controller_1.RadionicaController().azurirajKomentar(req, res));
radionicaRouter.route('/obrisiKomentar').post((req, res) => new radionica_controller_1.RadionicaController().obrisiKomentar(req, res));
radionicaRouter.route('/poruke').post((req, res) => new radionica_controller_1.RadionicaController().poruke(req, res));
radionicaRouter.route('/posaljiPoruku').post((req, res) => new radionica_controller_1.RadionicaController().posaljiPoruku(req, res));
radionicaRouter.route('/obrisiPrijavu').post((req, res) => new radionica_controller_1.RadionicaController().obrisiPrijavu(req, res));
radionicaRouter.route('/svePrijave').post((req, res) => new radionica_controller_1.RadionicaController().svePrijave(req, res));
radionicaRouter.route('/dodajLajk').post((req, res) => new radionica_controller_1.RadionicaController().dodajLajk(req, res));
radionicaRouter.route('/sviLajkovi').post((req, res) => new radionica_controller_1.RadionicaController().sviLajkovi(req, res));
radionicaRouter.route('/dodajKomentar').post((req, res) => new radionica_controller_1.RadionicaController().dodajKomentar(req, res));
radionicaRouter.route('/dodajRadionicu').post((req, res) => new radionica_controller_1.RadionicaController().dodajRadionicu(req, res));
radionicaRouter.route('/prihvatiRadionicu').post((req, res) => new radionica_controller_1.RadionicaController().prihvatiRadionicu(req, res));
radionicaRouter.route('/obrisiRadionicu').post((req, res) => new radionica_controller_1.RadionicaController().obrisiRadionicu(req, res));
radionicaRouter.route('/azurirajRadionicu').post((req, res) => new radionica_controller_1.RadionicaController().azurirajRadionicu(req, res));
radionicaRouter.route('/sveKoordinate').post((req, res) => new radionica_controller_1.RadionicaController().sveKoordinate(req, res));
radionicaRouter.route('/svaObavestenja').post((req, res) => new radionica_controller_1.RadionicaController().svaObavestenja(req, res));
radionicaRouter.route('/obrisiObavestene').post((req, res) => new radionica_controller_1.RadionicaController().obrisiObavestene(req, res));
radionicaRouter.route('/sacuvajZaObavestenje').post((req, res) => new radionica_controller_1.RadionicaController().sacuvajZaObavestenje(req, res));
radionicaRouter.route('/prijaviMe').post((req, res) => new radionica_controller_1.RadionicaController().prijaviMe(req, res));
radionicaRouter.route('/posaljiZaOtkazivanje').post((req, res) => new radionica_controller_1.RadionicaController().posaljiZaOtkazivanje(req, res));
radionicaRouter.route('/svePrijaveIDRad').post((req, res) => new radionica_controller_1.RadionicaController().svePrijaveIDRad(req, res));
radionicaRouter.route('/prihvatiPrijavu').post((req, res) => new radionica_controller_1.RadionicaController().prihvatiPrijavu(req, res));
radionicaRouter.route('/poruke1').post(//za organizatora poruke
(req, res) => new radionica_controller_1.RadionicaController().poruke1(req, res));
radionicaRouter.route('/svePrijave1').post(//za organizatora poruke
(req, res) => new radionica_controller_1.RadionicaController().svePrijave1(req, res));
exports.default = radionicaRouter;
//# sourceMappingURL=radionica.routes.js.map