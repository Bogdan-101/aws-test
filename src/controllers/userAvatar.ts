import express from "express";
import { Model } from "sequelize";
import {
  UserAvatarAttributes,
  UserAvatarCreationAttributes,
} from "../models/userAvatar";
import {BUCKET_NAME, s3} from "../s3bucket";

const multer = require("multer");
const multerS3 = require('multer-s3')

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: BUCKET_NAME,
    metadata: function (_req: any, file: any, cb: Function) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (_req: any, _file: any, cb: Function) {
      cb(null, Date.now().toString())
    }
  })
})

const categoryApi = (app: express.Application, db: any) => {
  app.get("/userAvatar", (_req: express.Request, res: express.Response) =>
    db.UserAvatar.findAll({ raw: true }).then(
      (result: Model<UserAvatarAttributes, UserAvatarCreationAttributes>[]) =>
        res.json(result)
    )
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
        avatarPath: req.file.originalname,
      }).then(
        (r: Model<UserAvatarAttributes, UserAvatarCreationAttributes>) => {
          res.send(r.get({ plain: true }));
        }
      );
    }
  );
};

export default categoryApi;
