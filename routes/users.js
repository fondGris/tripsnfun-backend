var express = require('express');
var router = express.Router();

require('../models/connection');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody')
const uid2 = require('uid2');
const bcrypt = require('bcrypt');


router.post('/signup', (req, res) => { 
  if (!checkBody(req.body, ['email', 'password', 'username'])) { 
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  // Check if the user has not already been registrated
  User.findOne({ email: req.body.email }).then(data => { 
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        token: uid2(32),
        firstName: null,
        lastName: null,
        birthdate: null,
        avatar: null,
        city: null,
        country: null,
        languages: [null],
        description: null,
        signUpDate: new Date(),
        userLocation: null,
      });

      newUser.save().then(newDoc => {
        res.json({ result: true, data: newDoc });
      });
    } else {
      // User already exists in database
      res.json({ result: false, error: 'User already exists' });
    }
  });
});

router.post('/signin', (req, res) => { 
  if (!checkBody(req.body, ['email', 'password'])) { 
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  User.findOne({ email: req.body.email }).then(data => { 
    if (data && bcrypt.compareSync(req.body.password, data.password)) { 
      res.json({ result: true, data: data });
    } else {
      res.json({ result: false, error: 'User not found or wrong password' });
    }
  })
});

// Router.put('/profile', (req, res) => {
//   const { firstName, lastName, city, country, description } = req.body;

//   // mise à jour des données utilisateur firstname, lastName, city, country et description

//   res.json({
//     message: 'Profile updated successfully!'
//   });
// });
// Router.post('/reset-password', (req, res) => {
//   const email = req.body.email;

//   // Send reset password email
//   sendResetPasswordEmail(email);

//   res.send('Reset password email sent.');
// });

// Router.post('/update-password', (req, res) => {
//   const email = req.body.email;
//   const newPassword = req.body.newPassword;

//   // Update user's password in database
//   updateUserPassword(email, newPassword);

//   res.send('Password updated.');
// });


module.exports = router;
