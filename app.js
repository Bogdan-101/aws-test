const express = require('express');
const app = express();

const port = process.env.PORT || 3003;

app.get('/', (req, res) => {
  res.send('Update from dev branch. It's alpha-point demo server running on aws.');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
