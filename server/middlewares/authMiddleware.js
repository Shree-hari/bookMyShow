const jws = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        console.log(req.headers.authorization);
        const token = req.headers.authorization.split(' ')[1];
        console.log("token: ", token);
        const verifiedToken = jws.verify(token, process.env.JWT_SECRET);
        console.log("verifiedToken: ", verifiedToken);

        req.body.userId = verifiedToken.userId;
        console.log("req.body.userId: ", req.body.userId);
        console.log("auth to next");
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Authentication failed',
        });
    }
}

module.exports = auth;