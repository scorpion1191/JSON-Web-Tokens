import {Request, Response} from "express";
import {authController} from "../../controllers/security/authController";
import {userController} from "../../controllers/user/userController";

export class userRoutes {       
    public routes(app): void {     
        app.route('/api/userCount').post(authController.verifyApiToken,async (req:Request, res:Response) => {
            try{
                let activeUsersCount = await userController.getUsersCount();
                res.status(200).send({count: activeUsersCount});
            }catch(err){
                res.status(404).send({error:"error",msg:'Could not get feedback request list, Please try again later'});
            }
        });

        app.route('/api/user').post(authController.verifyApiToken,async (req:Request, res:Response) => {
            try{
                let userId = req.body.userid;
                let userdetail = await userController.getUserDetails(userId);
                res.status(200).send({userdetail: userdetail[0]});
            }catch(err){
                res.status(404).send({error:"error",msg:'Could not get User detail , Please try again later'});
            }
        });
        

        app.route('/api/getAllUsers').post(authController.verifyApiToken,async (req:Request, res:Response) => {
            try{
                let userList = await userController.getAllUsers();
                res.status(200).send({users: userList});
            }catch(err){
                res.status(404).send({error:"error",msg:'Could not get list of users, Please try again later'});
            }
        });
    }
}



