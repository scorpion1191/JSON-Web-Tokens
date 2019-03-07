import * as mongoose from 'mongoose';

export class dbController {
    public static connectDb(){
        mongoose.connect('dburl');
    }
}