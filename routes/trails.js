const express = require('express');
const router = express.Router();
const Trail = require('../models/Trail');
const Comment = require('../models/Comment');
const WEATHER_KEY = process.env.WEATHER_KEY;

// PUBLIC listing of trails
router.get('/', async (req, res) => {
  const trails = await Trail.find({});
  res.render('trails', { trails, user: req.user });
});

// PUBLIC trail detail page
router.get('/:id', async (req, res) => {
  // Fetch trail and comments
  const trail = await Trail.findById(req.params.id);
  if (!trail) {
    return res.redirect('/trails');
  }
  const comments = await Comment.find({ trail: req.params.id }).populate('user');

  // Initialize weather and AQI
  let weather = null;
  let aqi = null;

  // Fetch live data if API key and coordinates are available
  if (WEATHER_KEY && trail.latitude != null && trail.longitude != null) {
    try {
      // Current weather
      const wRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${trail.latitude}&lon=${trail.longitude}&units=imperial&appid=${WEATHER_KEY}`
      );
      const wJson = await wRes.json();
      weather = {
        temp: wJson.main.temp,
        wind: wJson.wind.speed,
        condition: wJson.weather[0].main,
        icon: wJson.weather[0].icon
      };

      // Air Quality Index
      const aRes = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${trail.latitude}&lon=${trail.longitude}&appid=${WEATHER_KEY}`
      );
      const aJson = await aRes.json();
      aqi = aJson.list?.[0]?.main?.aqi;
    } catch (e) {
      console.error('Weather fetch error:', e);
    }
  }

  res.render('trail', { trail, comments, user: req.user, weather, aqi });
});

// COMMENT creation
router.post('/:id/comment', async (req, res) => {
  await Comment.create({
    text: req.body.text,
    user: req.user ? req.user._id : null,
    trail: req.params.id
  });
  res.redirect(`/trails/${req.params.id}`);
});

// Vote on a comment
router.post('/:id/comment/:commentId/vote', async (req, res) => {
  if (!req.user) return res.redirect(`/trails/${req.params.id}`);
  const { type } = req.query;
  const comment = await Comment.findById(req.params.commentId);
  const userId = req.user._id.toString();

  if (type === 'up') {
    // Remove existing downvote
    comment.downvotedBy = comment.downvotedBy.filter(id => id.toString() !== userId);
    // Toggle upvote
    if (comment.upvotedBy.some(id => id.toString() === userId)) {
      comment.upvotedBy = comment.upvotedBy.filter(id => id.toString() !== userId);
    } else {
      comment.upvotedBy.push(req.user._id);
    }
  } else if (type === 'down') {
    // Remove existing upvote
    comment.upvotedBy = comment.upvotedBy.filter(id => id.toString() !== userId);
    // Toggle downvote
    if (comment.downvotedBy.some(id => id.toString() === userId)) {
      comment.downvotedBy = comment.downvotedBy.filter(id => id.toString() !== userId);
    } else {
      comment.downvotedBy.push(req.user._id);
    }
  }

  await comment.save();
  if (req.xhr || (req.headers.accept && req.headers.accept.includes('application/json'))) {
    return res.json({
      upvotes: comment.upvotedBy.length,
      downvotes: comment.downvotedBy.length
    });
  }
  res.redirect(`/trails/${req.params.id}`);
});

module.exports = router;