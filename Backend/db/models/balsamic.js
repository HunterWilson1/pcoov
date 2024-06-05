// Backend/models/balsamic.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const balsamicSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  tags: { type: [String], required: true },
  // Add other fields as necessary
});

const Balsamic = mongoose.model('Balsamic', balsamicSchema);

module.exports = Balsamic;
