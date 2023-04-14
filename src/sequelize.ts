import { Sequelize } from 'sequelize-typescript';
import config from './config/config';
import { User } from './models/User';
import { Task } from './models/Task';

const { dialect, database, username, password } = config.db;

export const sequelize = new Sequelize(database, username, password, {
  dialect,
  models: [User, Task],
});

export default sequelize;
