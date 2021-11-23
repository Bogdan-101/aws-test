import express, { Application, Request, Response } from "express";
import userAvatarApi from "./controllers/userAvatar";
import db from './models/sequelize';
import cors from "cors";
import path from "path";

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
