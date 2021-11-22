import express, { Application, Request, Response } from "express";

const app: Application = express();
const port = process.env.PORT || 3000;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
    "/",
    async (_req: Request, res: Response): Promise<Response> => {
        return res.status(200).send({
            message: "Server is working on TS!",
        });
    }
);

try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch ({message}) {
    console.error(`Error occurred: ${message}`);
}
