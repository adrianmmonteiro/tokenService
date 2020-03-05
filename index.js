const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('./config');
const app = express();
const routes = require('./routes');
const rutasProtegidas = express.Router();

app.set('token', config.token);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


rutasProtegidas.use((req, res, next) => {
    const token = req.headers['access-token'];

    if (token) {
        jwt.verify(token, app.get('token'), (err, decoded) => {
            if (err) {
                return res.json({ mensaje: 'Token inválida' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.send({
            mensaje: 'Token no proveída.'
        });
    }
});

app.get("/", routes.serviceStatus);

app.post("/login", routes.auntenticar);

app.get("/tweets", rutasProtegidas, routes.tweets);

app.get("/hashtags", rutasProtegidas, routes.hashtags);

app.get("/validados", rutasProtegidas, routes.validated);

app.post("/validar/:id", rutasProtegidas, routes.validar);

app.post("/load", routes.auntenticar);

const port = 1337;
app.listen(port, () => {
    console.log('Service up on port: ',port);
});