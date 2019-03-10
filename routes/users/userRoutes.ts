import {Request, Response} from "express";
import User from '../../models/users/userModel'
import {authController} from "../../controllers/security/authController"

export class userRoutes {       
    public routes(app): void {  
        // RETURNS ALL THE USERS IN THE DATABASE        
        app.route('/verification').post(authController.verifyApiToken,(req:Request, res:Response) => {
            res.status(200).send({
                message: 'API authentication successfully done'
            })
        });    
    }
}



