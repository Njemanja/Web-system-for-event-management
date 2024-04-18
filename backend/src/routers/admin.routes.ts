import express from 'express'
import { UserController } from '../controllers/user.controller';
import { AdminController } from '../controllers/admin.controller';


const adminRouter= express.Router();

adminRouter.route('/odobri').post(
    (req,res)=> new AdminController().odobri(req, res)
)
adminRouter.route('/dohvati').post(
    (req,res)=> new AdminController().dohvatiUsluge(req, res)
)
adminRouter.route('/potvrdi').post(
    (req,res)=> new AdminController().potvrdi(req, res)
)

export default adminRouter;