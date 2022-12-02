import { DataTypes, Model } from 'denodb';
import SpotList from './SpotList.ts';
import User from './User.ts';

export default class Spot extends Model {
  static table = 'spot';
  static timestamps = true;
  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    list_id: {
      type: DataTypes.UUID,
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
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    longtitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  };

  static user() {
    return this.hasOne(User);
  }

  static list() {
    return this.hasOne(SpotList);
  }

  static defaults = {
    public: false,
    published: false,
  };
}
