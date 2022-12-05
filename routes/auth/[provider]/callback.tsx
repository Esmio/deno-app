import { Handlers } from '$fresh/server.ts';
import { URL } from 'https://deno.land/std@0.106.0/node/url.ts';

import User from '@/models/User.ts';
import SocialProfile from '@/models/SocialProfile.ts';

import config from '@/utils/config.ts';
import oauth from '@/utils/oauth.ts';
import { db, transaction } from '@/utils/db.ts';

export const handler: Handlers = {
  async GET(request, ctx) {
    const providerType = ctx.params.provider.toLowerCase();
    const provider = oauth.get(providerType);
    if (provider) {
      const url = new URL(request.url);
      // TODO: PR library with types
      const userProfile = (await provider.code.processAuth(url)) as {
        id: number;
        username: string;
        avatar: string;
      };
      let socialProfile = await SocialProfile.where({
        provider_type: providerType,
        provider_id: userProfile.id,
      }).first();
      console.log('userProfile', userProfile);
      console.log('socialProfile', socialProfile);
      if (!socialProfile) {
        // TODO: run in transaction ... when transactions work
        // await transaction(async () => {
        const user = await User.create({
          display_name: userProfile.username,
        });
        socialProfile = await SocialProfile.create({
          user_id: Number(user.id),
          provider_type: providerType,
          provider_id: userProfile.id,
          username: userProfile.username,
          // TODO: maybe just format this on frontend
          avatar_url: `https://cdn.discordapp.com/avatars/${userProfile.id}/${userProfile.avatar}.png`,
        });
        // });
        return Response.json(socialProfile);
      } else {
        socialProfile.username = userProfile.username;
        socialProfile.avatar_url = `https://cdn.discordapp.com/avatars/${userProfile.id}/${userProfile.avatar}.png`;
        socialProfile.update();
      }
      return Response.json({ socialProfile });
    }
    // TODO: show error message instead of instant redirect
    return Response.redirect(config!.base_url);
  },
};
