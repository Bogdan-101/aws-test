import express from "express";
import { Model } from "sequelize";
import {
  UserAvatarAttributes,
  UserAvatarCreationAttributes,
} from "../models/userAvatar";
import { BUCKET_NAME, s3 } from "../s3bucket";
// import {AWSError} from "aws-sdk";
// import {GetObjectOutput} from "aws-sdk/clients/s3";

const multer = require("multer");
const multerS3 = require("multer-s3");

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: BUCKET_NAME,
    metadata: function (_req: any, file: any, cb: Function) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (_req: any, file: any, cb: Function) {
      cb(null, `${Date.now().toString()}-${file.originalname}`);
    },
  }),
});

const categoryApi = (app: express.Application, db: any) => {
  app.get("/userAvatar", (_req: express.Request, res: express.Response) =>
    db.UserAvatar.findAll({ raw: true }).then(
      (result: Model<UserAvatarAttributes, UserAvatarCreationAttributes>[]) =>
        res.json(result)
    )
  );

  app.get(
    "/userAvatar/:userId",
    (req: express.Request, res: express.Response) => {
      const userId: number = +req.params.userId;

      db.UserAvatar.findOne({ where: { userId: userId } }).then(
        (
          user: Model<
            UserAvatarAttributes,
            UserAvatarCreationAttributes
          > | null
        ) => {
          if (user === null) {
            res.send("User not found");
          }

          const avatarPath = user?.get({plain: true}).avatarPath;

          res.send(avatarPath);

          // const params = { Bucket: BUCKET_NAME, Key: avatarPath };
          // s3.getObject(params, function (err:AWSError, data: GetObjectOutput) {
          //   if (err) {
          //     return res.send({ "error": err });
          //   }
          //   return res.send({ data });
          // });
        }
      );
    }
  );

  app.delete("/userAvatar", (req: express.Request, res: express.Response) => {
    const userId = req.body.userId;

    db.UserAvatar.destroy({
      where: {
        userId: userId,
      },
    });

    res.send("deleted");
  });

  app.post(
    "/userAvatar",
    upload.single("file"),
    (req: express.Request, res: express.Response) => {
      db.UserAvatar.create({
        userId: req.body.userId,
        // @ts-ignore
        avatarPath: req.file.key,
      }).then(
        (r: Model<UserAvatarAttributes, UserAvatarCreationAttributes>) => {
          res.send(r.get({ plain: true }));
        }
      );
    }
  );
};

export default categoryApi;
