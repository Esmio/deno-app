import { config as dotenv } from 'https://deno.land/x/dotenv@v3.2.0/mod.ts';
import Config from '../interfaces/Config.ts';

dotenv({ export: true });

const config: Config = {
  environment: Deno.env.get('DENO_ENV') || '',
  db: {
    database: Deno.env.get('DB_NAME') || '',
    host: Deno.env.get('DB_HOST') || '',
    username: Deno.env.get('DB_USERNAME') || '',
    password: Deno.env.get('DB_PASSWORD') || '',
    port: Number(Deno.env.get('DB_PORT')) || 5432,
  },
};
console.log(config);

Object.entries(config.db).forEach(([name, value]) => {
  if (!value) {
    throw new Error('Missing db config value: ' + name);
  }
});

export default config;
