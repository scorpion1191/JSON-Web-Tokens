import {authController} from "../../controllers/security/authController"
import {Request, Response} from "express";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

export class authRoutes {       
    public routes(app): void {          
        app.route('/').post((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'POST request successfulll!!!!'
            })
        })
            
        app.route('/api/login').post(async (req:Request,res:Response)=>{
            try{
                let userName = req.body.username;
                let user = await authController.verifyUser(userName);
                var passwordIsValid = bcrypt.compareSync(req.body.password, user[0]["password"]);
            
                if (!passwordIsValid) return res.status(401).send({error:"error", msg:"Incorrect UserName or Password" });
                //if user is found and password is valid
                // create a token
                let token = authController.genarateApiToken(user[0]["userid"]);
                // return the information including token as JSON
                res.status(200).send({ auth: true, token: token, user:user[0]});
            }catch(err){
                res.status(404).send({error:"error",msg:'Could nt Retrive User'});
            }
        });
   
        app.route('/api/logout').post((req:Request,res:Response)=>{
            res.status(200).send({ auth: false, token: null , msg:"LogedOut successfully" });
        });
    }
}
