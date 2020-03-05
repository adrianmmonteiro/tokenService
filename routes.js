const jwt = require('jsonwebtoken');
const config = require('./config');
const Request = require("request");

function serviceStatus(req, res) {
    res.send("Service is running");
};

function auntenticar(req, res) {
    if (req.body.usuario === "adrian" && req.body.password === "adrian") {
        const payload = {
            check: true
        };
        const token = jwt.sign(payload, config.token, {
            expiresIn: 1440
        });
        res.json({
            mensaje: 'Autenticación correcta',
            token: token
        });
    } else {
        res.json({ mensaje: "Usuario o contraseña incorrectos" })
    }
};

function tweets(req, res) {
    Request.get("http://localhost:8080/api/v1/tweets", (error, response, body) => {
        if (error) {
            console.log(error);
            res.send("Error");
            
        }
        res.send(JSON.parse(body)); 
    });
};


function hashtags(req, res) {
    Request.get("http://localhost:8080/api/v1/tweets/tags", (error, response, body) => {
        if (error) {
            console.log(error);
            res.send("Error");
        }
        res.send(JSON.parse(body));
    });
};

function validated(req, res) {
    Request.get("http://localhost:8080/api/v1/tweets/validated", (error, response, body) => {
        if (error) {
            console.log(error);
            res.send("Error");
        }
        res.send(JSON.parse(body));
    });
};

function validar(req, res) {
    Request.post("http://localhost:8080/api/v1/tweets/validated/" + req.params.id, (error, response, body) => {
        if (error) {
            console.log(error);
            res.send("Error");
        }
        res.send("Tweet validado");
    });
};


function load(req, res) {
    Request.get("http://localhost:8080/api/v1/tweets/consume", (error, response, body) => {
        if (error) {
            console.log(error);
            res.send("Error");
        }
        res.send("Tweet cargados");
    });
};

module.exports = {
    serviceStatus, auntenticar, tweets, hashtags, validated, validar, load
    
};