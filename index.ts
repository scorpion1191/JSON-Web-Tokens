import * as express from 'express';
import * as bodyParser from 'body-parser';
import {dbController} from "./controllers/database/dbController";

class webServer{

    public app;

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
        dbController.connectDb();
    }
    // setup the different routes used in the applications
    private setupRoutes(){

    }
    // setup error handlers
    private setupErrorHandlers(){

    }
    // start the web server
    public launchWebServer(){

    }
}


// this will ensure that the webserver is started on start 
let app = new webServer();
app.launchWebServer();

