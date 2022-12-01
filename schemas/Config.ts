// TODO: figure out how to use this type with zod
// import { PostgresOptions } from 'denodb';
import { z } from "zod";
import EnvironmentVariableNames from "@/constants/EnvironmentVariableNames.ts";

function getErrorMessage(enviromentVariableName: EnvironmentVariableNames) {
  return {
    message: `missing ${enviromentVariableName} environment variable`,
  };
}

export const ConfigSchema = z.object({
  base_url: z
    .string()
    .min(1, getErrorMessage(EnvironmentVariableNames.BASE_URL)),
  environment: z
    .string()
    .min(1, getErrorMessage(EnvironmentVariableNames.DENO_ENV)),
  db: z.object({
    database: z
      .string()
      .min(1, getErrorMessage(EnvironmentVariableNames.DB_NAME)),
    host: z.string().min(1, getErrorMessage(EnvironmentVariableNames.DB_HOST)),
    username: z
      .string()
      .min(1, getErrorMessage(EnvironmentVariableNames.DB_USERNAME)),
    password: z
      .string()
      .min(1, getErrorMessage(EnvironmentVariableNames.DB_PASSWORD)),
    port: z.number().default(5432),
  }),
  oauth: z.object({
    discord: z.object({
      client_id: z
        .string()
        .min(1, getErrorMessage(EnvironmentVariableNames.DISCORD_CLIENT_ID)),
      client_secret: z
        .string()
        .min(
          1,
          getErrorMessage(EnvironmentVariableNames.DISCORD_CLIENT_SECRET),
        ),
    }),
  }),
});

export type Config = z.infer<typeof ConfigSchema>;
