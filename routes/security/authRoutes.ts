import {authController} from "../../controllers/security/authController"
import {Request, Response} from "express";

class authRoutes {       
    public routes(app): void {          
        app.route('/').get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })               
    }
}


export default new authRoutes();