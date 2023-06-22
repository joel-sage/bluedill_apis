const jwt = require('jsonwebtoken');
const validateToken = (req, res, next) => {
    // Get auth header VALUES
    const bearerHeader = req.headers['authorization'];

    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // format the data
        const bearer = bearerHeader.split(" ");
        // accessing the token value
        const bearerToken = bearer[1];
        // the set to the request object
        req.token = bearerToken;
        // Call the next middleware next function 
        next();
    } else {
        // forbidden
        res.status(403).json({"WARNING": "ACCESS DENIED"})
    }
}

module.exports = {
    validateToken
}