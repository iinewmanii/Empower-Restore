const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionsSchema = new Schema({
  tag: {
    type: String,
    required: true,
  },
  question: {
    type: String,
  },
});

module.exports = mongoose.model('Questions', QuestionsSchema);
