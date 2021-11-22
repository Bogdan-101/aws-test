const express = require('express');
const app = express();

const port = process.env.PORT || 3003;

app.get('/', (req, res) => {
    res.send(
        "Deploy environment"
    );
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});