const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FamilyTrackSchema = new Schema({
  tag: {
    type: String,
    required: true,
  },
  question: {
    type: String,
  },
});

module.exports = mongoose.model('FamilyTrack', FamilyTrackSchema);
