import { Dialect } from 'sequelize';

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
    host: process.env.DB_HOST?process.env.DB_HOST:"",
    database: process.env.DB_NAME?process.env.DB_NAME:"",
    username: process.env.DB_USER?process.env.DB_USER:"",
    password: process.env.DB_PASS?process.env.DB_PASS:"",
    dialect: 'mysql',
    }
};

export default config;

