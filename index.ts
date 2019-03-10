import * as express from 'express';
import * as bodyParser from 'body-parser';
import {dbController} from './controllers/database/dbController';
import {Configuration} from "config/config";
import * as data  from './config/config.json';

import {authRoutes} from './routes/security/authRoutes';
import {userRoutes} from './routes/users/userRoutes';

const config:Configuration = data;
class webServer{

    public app:any;

    constructor(){
        
        this.configWebServer();
        this.setupRoutes();
        this.setupErrorHandlers();
    }

    // configure the webserver with the required lib from node modules
    private configWebServer(){
        this.app = express();
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        dbController.connectDb(config.database.connection.host);
    }

    // setup the different routes used in the applications
    private setupRoutes(){
        new authRoutes().routes(this.app);
        new userRoutes().routes(this.app);
    }

    // setup error handlers
    private setupErrorHandlers(){

    }
    // start the web server
    public launchWebServer(){
        this.app.listen(config.port, function () {
            console.log('Example app listening on port 3000!');
        });
    }
}


// this will ensure that the webserver is started on start 
let app = new webServer();
app.launchWebServer();

