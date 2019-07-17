const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const withAuth = require('../helper/middleware');

dotenv.config();

const router = express.Router();

router.get('/login', (req, res) => {
  res.send('Welcome!');
});
router.get('/secret', withAuth, (req, res) => {
  const { name, role, email } = req;
  res.send({ name, role, email });
});

router.post('/register', (req, res) => {
  const { ...userData } = req.body;
  console.log(userData);
  const user = new User(userData);
  user.save(function(err) {
    if (err) {
      console.log(err);
      res.status(500).send('Error registering new user please try again.');
    } else {
      res.status(200).send('Welcome to the club!');
    }
  });
});

router.get('/checkToken', withAuth, (req, res) => {
  const { name, role, email } = req;
  res.status(200).send({ name, role, email });
});

router.post('/authenticate', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: 'Internal error please try again'
      });
    } else if (!user) {
      res.status(401).json({
        error: 'Incorrect email or password'
      });
    } else {
      console.log(user);
      const { role, name } = user;
      user.isCorrectPassword(password, (err, same) => {
        if (err) {
          res.status(500).json({
            error: 'Internal error please try again'
          });
        } else if (!same) {
          res.status(401).json({
            error: 'Incorrect email or password'
          });
        } else {
          // Issue token
          const payload = { email, role, name };
          // console.log(role);
          const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
            expiresIn: '1h'
          });
          res.cookie('token', token, { httpOnly: true }).sendStatus(200);
        }
      });
    }
  });
});

module.exports = router;
