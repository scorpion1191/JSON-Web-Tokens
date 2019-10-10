import * as dataSources from '../database/dbController';
import {Op} from "sequelize";
import { Feedback } from '../../models/feedBackModel';
import { Userdetail } from '../../models/userDetailModel';
import { Users } from '../../models/userModel';

export class userController{
    
    public static async getActiveFeedbackCount(userId){
        
        let dataSource = dataSources.getDataSource();

        if(dataSource) {
            dataSource.addModels([Feedback]);
            let andClause : any = [
                {
                    PROVIDERID : userId
                },
                {
                    FEEDBACK : null
                }
            ];
            let query : any = {
                where: { [Op.and]: andClause }
            };
            return await Feedback.count(query);
        }
    }

    public static async getUsersCount(){
        let dataSource = dataSources.getDataSource();
        if(dataSource) {
            dataSource.addModels([Userdetail]);
            return await Userdetail.count();
        }
    }

    public static async getUserFeedback(userId){
        
        let dataSource = dataSources.getDataSource();
        if(dataSource) {
            dataSource.addModels([Feedback]);
            let andClause : any = [
                {
                    RECEIVERID : userId
                }
            ];
            let query : any = {
                where: { [Op.and]: andClause },
                attributes:["RECEIVERID","PROVIDERID","FEEDBACK"]
            };
            return await Feedback.findAll(query);
        }
    }

    public static async getAllPendingFeedback(userId){
        
        let dataSource = dataSources.getDataSource();
        if(dataSource) {
            dataSource.addModels([Feedback]);
            let andClause : any = [
                {
                    PROVIDERID : userId
                },{
                    FEEDBACK : null
                }
            ];
            let query : any = {
                where: { [Op.and]: andClause },
                attributes:["RECEIVERID","PROVIDERID","FEEDBACK"]
            };
            return await Feedback.findAll(query);
        }
    }

    public static async getUserDetails(userId){
        
        let dataSource = dataSources.getDataSource();
        if(dataSource) {
            dataSource.addModels([Userdetail]);
            let andClause : any = [
                {
                    userid : userId
                }
            ];
            let query : any = {
                where: { [Op.and]: andClause }
            };
            return await Userdetail.findAll(query);
        }
    }

    public static async getAllUsers(){
        let dataSource = dataSources.getDataSource();
        if(dataSource) {
            dataSource.addModels([Users]);
            let query : any = {
                attributes:["userid","username","email"]
            };
            return await Users.findAll(query);
        }
    }
}