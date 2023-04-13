// database.ts
import { Sequelize } from 'sequelize';
import config from './config';

const { dialect, host, username, password, database } = config.db;

const sequelize = new Sequelize(database, username, password, {
  dialect,
  host,
});

export default sequelize;
