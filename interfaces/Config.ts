import { PostgresOptions } from 'denodb';

export default interface Config {
  environment: string;
  db: PostgresOptions;
}
