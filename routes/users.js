var express = require('express');
var router = express.Router();

require('../models/connection');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody')
const uid2 = require('uid2');
const bcrypt = require('bcrypt');

// route pour s'inscrire, avec le module checkbody pour verifier que les champs ne sont pas vide
router.post('/signup', (req, res) => {
  if (!checkBody(req.body, ['email', 'password', 'username'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  // Check if the user has not already been registrated
  User.findOne({ email: req.body.email }).then(data => {
    if (data === null) {
      // si aucun user il va hash le password grace a bcrypt puis crée un nouvel utilisateur
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        token: uid2(32),
        firstname: 'Firstname',
        lastname: 'Lastname',
        age: null,
        avatar: null,
        city: 'City',
        country: 'Country',
        languages: [null],
        description: 'Description',
        signUpDate: new Date(),
        userLocation: null,
        hobbies: null,
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

// route pour permettre le login, avec le module checkbody pour verifier que les champs ne sont pas vide
router.post('/signin', (req, res) => {
  if (!checkBody(req.body, ['email', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  // une fois que tous les champs sont verifiés non vide faire une recherche par rapport au mail du user 
  User.findOne({ email: req.body.email }).then(data => {
    // debut de la comparaison du data entrée et celui de la base de donnée avec le module bcrypt
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, data: data });
    } else {
      res.json({ result: false, error: 'User not found or wrong password' });
    }
  })
});

// Récupère les toutes les information d'un user en fonction de son token.
router.get("/getUser/:token", (req, res) => {
  User.findOne({ token: req.params.token }).then((data) => {
    if (data) {
      res.json({ result: true, data: data });
    } else {
      res.json({ result: false, error: "No user" })
    }
  });
});

// Modifie les information d'un User.

router.put('/:token', (req, res) => {
  const {username, email, firstname, lastname, age, avatar, city, country, hobbies, description } = req.body;
  User.updateOne({
    token: req.params.token },
    { username, email, firstname, lastname, age, avatar, city, country, hobbies, description }
  ).then((data) => {
    res.json({result: true, data : data})
  });
});


module.exports = router;
