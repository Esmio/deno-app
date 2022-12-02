import { Relationships } from 'denodb';
import User from './User.ts';
import SocialProfile from './SocialProfile.ts';
import SpotList from './SpotList.ts';
import Spot from './Spot.ts';

Relationships.belongsTo(SocialProfile, User, { foreignKey: 'user_id' });
Relationships.belongsTo(SpotList, User, { foreignKey: 'user_id' });
Relationships.belongsTo(Spot, User, { foreignKey: 'user_id' });
Relationships.belongsTo(Spot, SpotList, { foreignKey: 'list_id' });

export default [User, SocialProfile, SpotList, Spot];
