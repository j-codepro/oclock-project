const jwt = require('express-jwt');

const authorizationMiddleware = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    getToken: (req) => req.cookies.token,
});

module.exports = authorizationMiddleware;