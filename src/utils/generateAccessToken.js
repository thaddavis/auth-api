const jwt = require('jsonwebtoken');

function generateAccessToken(username) {
    return jwt.sign(
        username,
        process.env.JWT_SECRET,
        {
            expiresIn: '12 hours'
        }
    );
}

module.exports = {
    generateAccessToken
}