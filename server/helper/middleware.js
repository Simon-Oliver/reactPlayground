const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const secret = process.env.TOKEN_SECRET;

const withAuth = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.name = decoded.name;
        req.email = decoded.email;
        req.role = decoded.role;
        next();
      }
    });
  }
};
module.exports = withAuth;
