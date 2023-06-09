const express = require('express');
const path = require('path');
const mainRouter = require('./routes/main.js');
const config = require('./config.js');
const basicAuth = require('express-basic-auth')

const app = express();

app.use(basicAuth({
    users: { 'cmu': config.adminPass},
    challenge: true
}))
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use('/assets/', express.static(path.join(__dirname, 'assets')));
app.use('/favicon.ico', express.static(path.join(__dirname, 'assets/favicon.ico')));
app.use('/', mainRouter);

app.listen(config.listenPort);
