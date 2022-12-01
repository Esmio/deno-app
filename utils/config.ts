import { config as dotenv } from 'dotenv';
import { Config, ConfigSchema } from '@/schemas/Config.ts';
import EnvironmentVariableNames from '@/constants/EnvironmentVariableNames.ts';

dotenv({ export: true });

const envConfig: Config = {
  base_url:
    Deno.env.get(EnvironmentVariableNames.BASE_URL) || 'http://localhost:8000',
  environment: Deno.env.get(EnvironmentVariableNames.DENO_ENV) || '',
  db: {
    database: Deno.env.get(EnvironmentVariableNames.DB_NAME) || '',
    host: Deno.env.get(EnvironmentVariableNames.DB_HOST) || '',
    username: Deno.env.get(EnvironmentVariableNames.DB_USERNAME) || '',
    password: Deno.env.get(EnvironmentVariableNames.DB_PASSWORD) || '',
    port: Number(Deno.env.get(EnvironmentVariableNames.DB_PORT)) ?? 5432,
  },
  oauth: {
    discord: {
      client_id: Deno.env.get(EnvironmentVariableNames.DISCORD_CLIENT_ID) || '',
      client_secret:
        Deno.env.get(EnvironmentVariableNames.DISCORD_CLIENT_SECRET) || '',
    },
  },
};

let config: Config | null = null;
const result = ConfigSchema.safeParse(envConfig);
if (!result.success) {
  const firstError = JSON.parse(result.error.message)[0].message;
  throw new Error(firstError, { cause: result.error });
} else {
  config = result.data;
}

export default config;
