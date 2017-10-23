const express = require('express');
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');

const router = express.Router();

router.get('/users', (req, res, next) => {
  knex('users')
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      next(err);
    })
})

// router.post('/users', (req, res, next) => {
//   bcrypt.hash(req.body.password, 12)
//     .then(password => {
//       console.log(password);
//       return knex('users')
//         .insert({
//           username: req.body.username,
//           hashed_password: password
//         });
//     })
//     .then(data => {
//       res.status(200).send(data);
//     })
//     .catch(err => {
//       res.sendStatus(404);
//       next(err);
//     })
// })

router.post('/users', (req, res, next) => {
  // const {username, password} = req.body;

  bcrypt.hash(req.body.password, 12)
    .then(password => {
      return knex('users')
        .insert({username: req.body.username, hashed_password: password})
    })
    .then(function() {
      res.sendStatus(200);
    })
    .catch(err => {
      next(err);
    })
})

module.exports = router;
