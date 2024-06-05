// Backend/models/oliveOil.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const oliveOilSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  tags: { type: [String], required: true },
  pairings: {type: [String], required: true}
  // Add other fields as necessary
});

const OliveOil = mongoose.model('OliveOil', oliveOilSchema);

module.exports = OliveOil;
