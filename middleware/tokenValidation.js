const jwt = require('jsonwebtoken');

// authHeader (header , token) <= in the req header , (from user)
const validateToken = (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, decode) => {
            if (err) {
                res.status(401).send('not authorized'); return;
            }
            req.user = decode.user;
            next();
        })
    }
    // just in case , itn't thier any token in the reauest   
    if (!token) {
        res.status(401).send('missing token') ; return;
    }
}

module.exports = validateToken;