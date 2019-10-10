import {Request, Response} from "express";
import {authController} from "../../controllers/security/authController"
import {userController} from "../../controllers/user/userController"

export class feedbackRoutes {       
    public routes(app): void {     
        app.route('/api/requestfeedback').post(authController.verifyApiToken,(req:Request, res:Response) => {
            try{
                res.status(200).send({msg:'successfully got all the feedback list'});
            }catch(err){
                res.status(404).send({msg:'Could not request feedback'});
            }
        });
        
        app.route('/api/feedbackCount').post(authController.verifyApiToken,async (req:Request, res:Response) => {
            try{
                let userId = req.body.userid;
                let activeFeedBackCount = await userController.getActiveFeedbackCount(userId);
                res.status(200).send({count: activeFeedBackCount});
            }catch(err){
                res.status(404).send({error:"error",msg:'Could not get feedback request list, Please try again later'});
            }
        });

        app.route('/api/feedback').post(authController.verifyApiToken,async (req:Request, res:Response) => {
            try{
                let userId = req.body.userid;
                let feedbackList = await userController.getUserFeedback(userId);
                console.log(feedbackList)
                res.status(200).send({feedback: feedbackList});
            }catch(err){
                res.status(404).send({error:"error",msg:'Could not get feedback list, Please try again later'});
            }
        });

        app.route('/api/pendingfeedback').post(authController.verifyApiToken,async (req:Request, res:Response) => {
            try{
                let userId = req.body.userid;
                console.log(userId)
                let feedbackList = await userController.getAllPendingFeedback(userId);
                console.log(feedbackList)
                res.status(200).send({feedback: feedbackList});
            }catch(err){
                res.status(404).send({error:"error",msg:'Could not get feedback list, Please try again later'});
            }
        });
        

        

    }
}



