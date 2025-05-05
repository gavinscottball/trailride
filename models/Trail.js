const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trailSchema = new Schema({
  name: String,
  location: String,
  latitude: Number,
  longitude: Number,
  difficulty: String,
  distance: Number,
  altitudeChange: Number,
  startingElevation: Number,
  description: String,
  pictures: { type: [String], default: [] },
  relatedTrails: [{ type: Schema.Types.ObjectId, ref: 'Trail' }]
});

// Export the model, not just the schema
module.exports = mongoose.model('Trail', trailSchema);