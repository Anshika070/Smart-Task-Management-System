require('dotenv').config();
const app = require('./app');
const connectDatabase = require('./config/database');

const port = process.env.PORT || 5000;
connectDatabase().then(() => {
  app.listen(port, () => console.log(`Taskflow API listening on ${port}`));
});
