import { Sequelize, Model, DataTypes, Optional } from "sequelize";

export interface UserAvatarAttributes {
  id: number;
  userId: number;
  avatarPath: string;
}

export interface UserAvatarCreationAttributes
  extends Optional<UserAvatarAttributes, "id"> {}

export interface UserAvatarInstance
  extends Model<UserAvatarAttributes, UserAvatarCreationAttributes>,
    UserAvatarAttributes {}

const UserAvatar = (sequelize: Sequelize) => {
  return sequelize.define<UserAvatarInstance>(
    "UserAvatar",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      avatarPath: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true, // Model tableName will be the same as the model name
    }
  );
};

export default UserAvatar;
