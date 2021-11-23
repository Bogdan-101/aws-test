import express from "express";
import fs from "fs";
import { Model } from "sequelize";
import {
  UserAvatarAttributes,
  UserAvatarCreationAttributes,
} from "../models/userAvatar";

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (_req: any, _file: any, cb: Function) {
    cb(null, `/app/public/images/`);
  },
  filename: function (_req: any, file: any, cb: Function) {
    cb(null, `${Date.now().toString()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});

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
      // @ts-ignore
      const file = global.appRoot + "/public/images/" + req.file.filename;
      console.log("FILE: ", file);
      // @ts-ignore
      fs.rename(req.file.path, file, function (err) {
        if (err) {
          console.log(err);
          res.send(500);
        } else {
          db.UserAvatar.create({
            userId: req.body.userId,
            // @ts-ignore
            avatarPath: req.file.filename,
          }).then(
            (r: Model<UserAvatarAttributes, UserAvatarCreationAttributes>) => {
              res.send(r.get({ plain: true }));
            }
          );
        }
      });
    }
  );
};

export default categoryApi;
