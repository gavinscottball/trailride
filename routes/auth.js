// routes/auth.js
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = function(passport) {
  // Configure local strategy
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) return done(null, false, { message: 'Incorrect username.' });
        const valid = await user.validatePassword(password);
        if (!valid) return done(null, false, { message: 'Incorrect password.' });
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) =>
    User.findById(id).then(user => done(null, user)).catch(done)
  );

  const router = express.Router();

  // Sign-up routes
  router.get('/signup', (req, res) => res.render('signup'));
  router.post('/signup', async (req, res) => {
    try {
      await new User(req.body).save();
      req.flash('success', 'Account created! Please log in.');
      res.redirect('/login');
    } catch (e) {
      req.flash('error', 'Username already taken.');
      res.redirect('/signup');
    }
  });

  // Login routes
  router.get('/login', (req, res) => res.render('login'));
  router.post(
    '/login',
    passport.authenticate('local', {
      successRedirect: '/trails',
      failureRedirect: '/login',
      failureFlash: true
    })
  );

  // Logout
  router.get('/logout', (req, res) => {
    req.logout(() => {});
    res.redirect('/');
  });

  return router;
};