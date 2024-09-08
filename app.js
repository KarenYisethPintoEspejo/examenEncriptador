const express = require('express');
const path = require('path');
const app = express();
const routes = require('./server/routes/route'); 

app.use(express.json());

const config = {
    port: process.env.EXPRESS_PORT || 3000,
    host: process.env.EXPRESS_HOST || '0.0.0.0',
    static:process.env.EXPRESS_STATIC
};

app.use(express.static(config.static));
app.use('/', routes);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        status: err.status || 500,
        message: err.message || 'Error interno del servidor'
    });
});

app.listen(config.port, '0.0.0.0', () => {
    console.log(`http://${config.host}:${config.port}`);
});
