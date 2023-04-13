// database.ts
import { Sequelize } from 'sequelize-typescript';
import config from '../config/config';
import {User} from './user.model';

const { dialect, host, username, password, database } = config.db;

export const sequelize = new Sequelize({
  database,  
  dialect,
  username,
  password, 
  models: [User],
});
export default sequelize;
