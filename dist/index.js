"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Body parsing Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (_req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    return res.status(200).send({
        message: "Server is working on TS!",
    });
}));
try {
    app.listen(port, () => {
        console.log(`Connected successfully on port ${port}`);
    });
}
catch ({ message }) {
    console.error(`Error occurred: ${message}`);
}
//# sourceMappingURL=index.js.map