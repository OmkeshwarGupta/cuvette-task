const jwt = require('jsonwebtoken');

module.exports  = function (req, res, next) {
    const token =req.cookies.token || req.body.token || req.header('Autherisation').replace('Bearer', "");
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
    console.log(token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log(decoded);
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
