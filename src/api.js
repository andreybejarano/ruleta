require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const pkg = require('../package.json');

const api = express();
const basePath = '/api';

api.use(cors());

// Not use morgan for logs in Production
if (process.env.NODE_ENV !== 'production') {
  api.use(morgan('dev'));
}

// Disabled x-powered-by for security
api.disable('x-powered-by');

// Parse body params and attach them to req.body
api.use(express.json());
api.use(express.urlencoded({ extended: true }));

// include routes and expose in base path
api.use(basePath, require('./routes'));

// Not found error middleware
api.use((req, res, next) => {
    res.status(404).send({
        status: 404,
        error: 'Resource not found'
    });
});

// Error middleware
api.use((err, req, res, next) => {
    let status = err.status || 500;
    if (err.response) {
        err.message = `${err.message} ${err.response.data.message}`;
        status = err.response.status;
    }
    return res.status(status).json({ status, error: err.message });
});

api.listen(process.env.PORT, () => {
    console.log(`${pkg.name} on http://localhost:${process.env.PORT}${basePath}  (${process.env.NODE_ENV})`);
});