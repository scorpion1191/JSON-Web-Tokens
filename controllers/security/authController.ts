import * as jwt from "jsonwebtoken";
import * as fs from "fs";
import * as dataSources from '../database/dbController';
import {Op} from "sequelize";
import { Users } from '../../models/userModel';
const privateKEY  = fs.readFileSync('./private.key', 'utf8');
export class authController{
    
    public static genarateApiToken(userId){
        let token = jwt.sign({ id: userId }, privateKEY, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    }
    
    public static verifyApiToken(req, res, next){
        // check header or url parameters or post parameters for token
        var token = req.headers['x-access-token'];
        if (!token) 
            return res.status(403).send({ auth: false, message: 'No token provided' });

        // verifies secret and checks exp
        jwt.verify(token, privateKEY, function(err, decoded) {      
            if (err) 
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });    

            // if everything is good, save to request for use in other routes
            req.userId = decoded.id;
            next();
        });
    }

    public static async verifyUser(userName){
        
        let dataSource = dataSources.getDataSource();

        if(dataSource) {

            dataSource.addModels([Users]);
            let andClause : any = [
                {
                    username: userName
                }
            ];
            let query : any = {
                where: { [Op.and]: andClause },
                attributes:["userid","username","email","usertype","password"]
            };

            return await Users.findAll(query);
        }
    }
}