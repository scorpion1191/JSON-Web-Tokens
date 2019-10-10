import {Sequelize} from 'sequelize-typescript';
import * as config from 'config';

let dbConfig : any = config.get('database');
let webDataSource = null;

export function getDataSource() {
        if(!webDataSource) {
            webDataSource = new Sequelize({
                "dialectOptions":{"ssl":false},
                "pool":{"max":5,"min":0,"idle":10000},
                "database":"ivohobzt",
                "username":"ivohobzt",
                "dialect":"postgres",
                "quoteIdentifiers":false,
                "host":"salt.db.elephantsql.com",
                "password":"s4mLWRxPw9P4hVEXqKO2Mbr7CdiMqm4P"
              });
            }
        return webDataSource;
}