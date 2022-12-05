import { Database, PostgresConnector } from 'denodb';
import { PostgresClient } from 'denodb/deps';
import envConfig from './config.ts';
import models from '@/models/index.ts';

const connector = new PostgresConnector(envConfig!.db);

export const db = new Database({ connector, debug: true });

export async function transaction(block: () => Promise<void>): Promise<void> {
  const client = db['_connector']['_client'] as PostgresClient;
  const transaction = client.createTransaction('transaction');

  db['_connector']['_client'] = transaction;

  await transaction.begin();
  await block();
  await transaction.commit();

  db['_connector']['_client'] = client;

  // Waiting for a fix of DenoDB
  //return this.client.transaction(block) as Promise<void>;
}

export default () => {
  db.link(models);
  // db.sync({
  //   // TODO: enable this when there is a model change
  //   drop: envConfig!.environment === 'development',
  // });
};
