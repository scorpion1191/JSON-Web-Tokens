import * as mongoose from 'mongoose';

export class dbController {
    public static connectDb(dbURL){
        mongoose.connect(dbURL,{
            keepAlive : true,
            connectTimeoutMS:30000,
            useNewUrlParser: true
        });

        mongoose.connection.on('error',console.error.bind(console,'Connection Error'));

        mongoose.connection.once('open',()=>{
            console.log('connected to database');
        })
    }
}