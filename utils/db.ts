import { Database, PostgresConnector } from 'denodb';
import envConfig from './config.ts';
import models from '@/models/index.ts';

const connector = new PostgresConnector(envConfig!.db);
const db = new Database(connector);

db.link(models);

export default () => {
  db.sync({
    // TODO: enable this when there is a model change
    // drop: config.environment === 'development',
  });
};
