const jwt = require('jsonwebtoken')
const home = async (req, res) => {
    jwt.verify(req.token, 'sage_ssKey', (err, authData) => {
        if (err) res.sendStatus(403);
        res.status(200).json({ "Message": "User LoggedIn And Authenticated", authData })
    })
}

module.exports = {
    home
}