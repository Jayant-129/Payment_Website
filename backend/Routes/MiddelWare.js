const {JWT_SECRET} = require('../config.js')
const jwt = require('jsonwebtoken')
const authMiddleWare = (req, res, next) => {
    const {authorization} = req.headers;
    if(!authorization || !authorization.startsWith('Bearer ')){
        return res.status(403).json({});
    }
    const userToken = authorization.split(' ')[1];
    try{
        const decode = jwt.verify(userToken,JWT_SECRET);
        req.userId = decode.userId;
        next();
    }
    catch(err){
        return res.status(403).json({});
    }
};

module.exports = authMiddleWare;