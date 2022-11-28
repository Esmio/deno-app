import * as mod from 'https://deno.land/x/dotenv/mod.ts';
import Config from '../interfaces/Config.ts';

await mod.config();

const config: Config = {
  base_url: Deno.env.get('BASE_URL') || 'http://localhost:8000',
  environment: Deno.env.get('DENO_ENV') || '',
  db: {
    database: Deno.env.get('DB_NAME') || '',
    host: Deno.env.get('DB_HOST') || '',
    username: Deno.env.get('DB_USERNAME') || '',
    password: Deno.env.get('DB_PASSWORD') || '',
    port: Number(Deno.env.get('DB_PORT')) ?? 5432,
  },
  oauth: {
    discord: {
      client_id: Deno.env.get('DISCORD_CLIENT_ID') || '',
      client_secret: Deno.env.get('DISCORD_CLIENT_SECRET') || '',
    },
  },
};
console.log('config', config);

Object.entries(config.db).forEach(([name, value]) => {
  if (!value) {
    throw new Error('Missing db config value: ' + name);
  }
});

export default config;
