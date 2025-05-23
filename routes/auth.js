// routes/auth.js
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
    const { username, password } = req.body;
    try {
      // Check if username is already in use
      const existing = await User.findOne({ username });
      if (existing) {
        req.flash('error', 'Username already taken.');
        return res.redirect('/signup');
      }
      // Create and save new user
      const user = new User({ username, password });
      await user.save();
      req.flash('success', 'Account created! Please log in.');
      return res.redirect('/login');
    } catch (err) {
      console.error(err);
      req.flash('error', 'Something went wrong. Please try again.');
      return res.redirect('/signup');
    }
  });

  // Login routes
  router.get('/login', (req, res) => res.render('login'));
  router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        console.error(err);
        req.flash('error', 'Something went wrong. Please try again.');
        return res.redirect('/login');
      }
      if (!user) {
        req.flash('error', info.message);
        return res.redirect('/login');
      }
      req.logIn(user, (err) => {
        if (err) {
          console.error(err);
          req.flash('error', 'Login failed. Please try again.');
          return res.redirect('/login');
        }
        return res.redirect('/trails');
      });
    })(req, res, next);
  });

  // Logout
  router.get('/logout', (req, res) => {
    req.logout(() => {});
    res.redirect('/');
  });

  return router;
};