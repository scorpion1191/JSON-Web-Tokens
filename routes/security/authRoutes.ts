import {authController} from "../../controllers/security/authController"
import User from '../../models/users/userModel'
import {Request, Response} from "express";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

export class authRoutes {       
    public routes(app): void {          
        app.route('/').get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })
        
        app.route('/registerUser').post((req:Request,res:Response)=>{
            let encryptedPassword = bcrypt.hashSync(req.body.password, 8);
            User.create({
                firstName:req.body.firstName,
                lastName : req.body.lastName,
                email : req.body.email,
                password : encryptedPassword
            }, 
            function (err, user) {
                if (err) return res.status(500).send(err);
                // if user is registered without errors
                // create a token
                let token = authController.genarateApiToken(user._id);
                res.status(200).send({ auth: true, token: token });
            });
        });

                
        app.route('/login').post((req:Request,res:Response)=>{
            User.findOne({ email: req.body.email }, function (err, user) {
                if (err) return res.status(500).send('Error on the server.');
                if (!user) return res.status(404).send('No user found.');
                // check if the password is valid
                var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
                if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
            
                // if user is found and password is valid
                // create a token
                let token = authController.genarateApiToken(user._id);
                // return the information including token as JSON
                res.status(200).send({ auth: true, token: token });
              });
        });

                
        app.route('/logout').post((req:Request,res:Response)=>{
            res.status(200).send({ auth: false, token: null });
        });
    }
}
