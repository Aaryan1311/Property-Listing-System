require('dotenv').config();
const express = require('express');
const { ServerConfig, DatabaseConnection } = require('./config');
const qs = require('qs');

const apiRoutes = require('./routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

DatabaseConnection.connectDB();
app.set('query parser', (str) => qs.parse(str));

app.use('/api',apiRoutes);


app.listen(ServerConfig.PORT, () => {
  console.log(`Server is running on port: ${ServerConfig.PORT}`);
});
