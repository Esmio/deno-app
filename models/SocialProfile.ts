import { DataTypes, Model } from 'denodb';
import User from './User.ts';

export default class SocialProfile extends Model {
  static table = 'social_profile';
  static timestamps = true;
  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    provider_type: DataTypes.enum(['discord', 'twitch', 'google']),
    // TODO: add an index using another language
    provider_id: {
      type: DataTypes.STRING,
      length: 50,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      length: 255,
      allowNull: false,
    },
    avatar_url: {
      type: DataTypes.STRING,
      length: 2048,
      allowNull: true,
    },
  };

  static user() {
    return this.hasOne(User);
  }
}
