import {Sequelize} from "sequelize";
import UserAvatarModel from "./userAvatar";

const sequelize = new Sequelize(
  process.env.DB_NAME as string || process.env.DB_NAME_LOCAL as string,
  process.env.DB_USER as string || process.env.DB_USER_LOCAL as string,
  process.env.DB_PASSWORD || process.env.DB_PASSWORD_LOCAL,
  {
    host: process.env.DB_HOST || process.env.DB_HOST_LOCAL,
    dialect: "postgres",
  }
);

const UserAvatar = UserAvatarModel(sequelize);

//Pass { force: true } as option if you want to force delete and recreate.
sequelize.sync().then(() => {
  console.log(`Database & tables created!`);
});

export default {
    UserAvatar
}
