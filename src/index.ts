import express, { Application, Request, Response } from "express";
import userAvatarApi from "./controllers/userAvatar";
import db from './models/sequelize';
import cors from "cors";
import path from "path";

require('dotenv').config();
const AWS = require('aws-sdk');
const SESConfig = {
    apiVersion: "2021-11-23",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    accessSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "us-east-2"
}
AWS.config.update(SESConfig);

const app: Application = express();
const port = process.env.PORT || 8000;

// @ts-ignore
global.appRoot = path.join(__dirname, '..');

// TODO: set whitelist
app.use(cors());

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, '..', 'public/images')))

app.get(
    "/",
    async (_req: Request, res: Response): Promise<Response> => {
        return res.status(200).send({
            message: "Server is working on TS!",
        });
    }
);

userAvatarApi(app,db);

try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch ({message}) {
    console.error(`Error occurred: ${message}`);
}
