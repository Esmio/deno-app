import { DataTypes, Model } from 'denodb';
import User from './User.ts';

export default class SpotList extends Model {
  static table = 'spot_list';
  static timestamps = true;
  static fields = {
    id: {
      // TODO: do this in the db instead of create
      type: DataTypes.UUID,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      unique: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      length: 255,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      length: 2000,
      allowNull: true,
    },
    public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    published: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    // TODO: add center coordinate
  };

  static user() {
    return this.hasOne(User);
  }

  // static spot() {
  //   return this.hasOne(Spot);
  // }

  static defaults = {
    public: false,
    published: false,
  };
}
