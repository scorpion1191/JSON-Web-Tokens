import {Request, Response} from "express";
import {User} from '../../models/users/userModel'


class userRoutes {       
    public routes(app): void {  
        // RETURNS ALL THE USERS IN THE DATABASE        
        app.route('/getAllUsers').get((req: Request, res: Response) => {            
            User.find({}, function (err, users) {
                if (err)
                     return res.status(500).send("There was a problem finding the users.");
                res.status(200).send(users);
            });
        });     
    }
}


export default new userRoutes();


