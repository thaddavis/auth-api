const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const jwtCookie = req.cookies['jwt']
  const token = jwtCookie

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    
    console.log(err)
    console.log(user)

    if (err) return res.sendStatus(403)

    req.user = user

    next()

  })
}

module.exports = {
    authenticateToken
}