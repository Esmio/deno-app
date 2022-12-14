// deno-lint-ignore-file ban-ts-comment
import { HandlerContext } from '$fresh/server.ts';

import User from '@/models/User.ts';
import SocialProfile from '../../models/SocialProfile.ts';

export const handler = async (
  _req: Request,
  _ctx: HandlerContext
): Promise<Response> => {
  const users = await User.all();
  // TODO: delete this whole file
  const social_profiles = await SocialProfile.where(
    'user_id',
    // @ts-ignore
    'in',
    users.map((user) => user.id)
  ).all();
  const socialProfilesByUserId = social_profiles.reduce((byId, profile) => {
    // @ts-ignore
    byId.set(profile.user_id, profile);
    return byId;
  }, new Map<string, SocialProfile>());
  users.forEach((user) => {
    // @ts-ignore
    user.social_profile = socialProfilesByUserId.get(user.id);
  });
  return Response.json({
    users,
  });
};
