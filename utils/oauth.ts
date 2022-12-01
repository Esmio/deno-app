import { DiscordClient } from "https://deno.land/x/denoauth@v1.0.6/mod.ts";
import config from "./config.ts";

const Discord = new DiscordClient({
  clientId: config.oauth.discord.client_id,
  clientSecret: config.oauth.discord.client_secret,
  tokenUri: "https://discord.com/api/oauth2/token",
  redirect: `${config.base_url}/auth/discord/callback`, // The redirect uri is added in the GitHub OAuth developer settings
  // TODO: may be requires email
  scope: "identify",
});

// TODO: update type to include all possible oauth clients
export default new Map<string, DiscordClient>([["discord", Discord]]);
