import { Database, PostgresConnector } from 'denodb';
import config from './config.ts';
import models from '../models/index.ts';

// SQLite3Connector, MySQLConnector, PostgresConnector...
const connector = new PostgresConnector(config.db);
const db = new Database(connector);

db.link(models);

export default () => {
  db.sync({
    drop: config.environment === 'development',
  });
};
