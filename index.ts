import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as config from 'config';
import * as path from 'path'; 
import {authRoutes} from './routes/security/authRoutes';
import {userRoutes} from './routes/users/userRoutes';
import {feedbackRoutes} from './routes/feedback/feedback';

const port = process.env.PORT || config.get('port');

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

        this.app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, x-access-token, Content-Type, Accept");
            next();
          });
        
        this.app.use(express.static(path.join(__dirname, "client", "build")))

        this.app.get("*", (req, res) => {
            res.sendFile(path.join(__dirname, "client", "build", "index.html"));
        });
    }

    // setup the different routes used in the applications
    private setupRoutes(){
        new authRoutes().routes(this.app);
        new userRoutes().routes(this.app);
        new feedbackRoutes().routes(this.app);
    }

    // setup error handlers
    private setupErrorHandlers(){

    }
    // start the web server
    public launchWebServer(){
        this.app.listen(port, function () {
            console.log('Example app listening on port 3000!');
        });
    }
}


// this will ensure that the webserver is started on start 
let app = new webServer();
app.launchWebServer();

