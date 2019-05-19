const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActionsSchema = new Schema({
  tag: {
    type: String,
    required: true,
  },
  question: {
    type: String,
  },
});

module.exports = mongoose.model('Actions', ActionsSchema);
