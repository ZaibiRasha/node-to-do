import { Dialect } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();
interface Config {
  db: {
    dialect: Dialect;
    host: string;
    username: string;
    password: string;
    database: string;
  };
}

const config: Config = {
  db: {
    host: process.env.DB_HOST?process.env.DB_HOST:"localhost",
    database: process.env.DB_NAME?process.env.DB_NAME:"todo2",
    username: process.env.DB_USER?process.env.DB_USER:"root",
    password: process.env.DB_PASS?process.env.DB_PASS:"",
    dialect: 'mysql',
    }
};

export default config;

