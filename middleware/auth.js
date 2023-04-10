// const jwt = require("jsonwebtoken");
// const config = require("config");
//
// module.exports = function (req, res, next) {
//     const token = req.header("x-auth-token");
//     if (!token) return res.status(401).json({
//         status: false, message: 'failed', data: "Access Denied, no token provided!"
//     });
//
//     try {
//         const jwtPrivateKey = config.get("jwtPrivateKey");
//         const decoded = jwt.verify(token, jwtPrivateKey);
//         req.account = decoded;
//         next();
//     }
//     catch (ex) {
//         res.status(400).send('Invalid token.');
//     }
// }

const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).json({
            status: false, message: 'failed', data: "Unauthenticated"
        });
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = verifyToken;