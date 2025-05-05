// models/Comment.js

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  trail: { type: mongoose.Schema.Types.ObjectId, ref: 'Trail' },
  upvotedBy:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  downvotedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Comment', commentSchema);