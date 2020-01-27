const express = require('express');
const fs = require('fs');
const config = require('./config.json');

const app = express();

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.use(allowCrossDomain);

app.get('/',(req,res) => {
    console.log(config.dataPaths);
})

app.get('/list', (req,res) => {
    const list = new Promise((resolve, reject) => {
        fs.readFile(config.dataPaths.dataFile,'utf8',(error, data) => {
            if (error) return reject(error);
            return resolve(data.split(config.parseConfig.delimiter))
        });
    }).then((list) => {
        res.send(list);}
    );
});


const server = app.listen(config.serverPort, () => {
    console.log("Server is listening at port " + config.serverPort)
});
