const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Product
let productSchema = new Schema({
  name: String,
  price: Number,
  properties: [String],
  time: String,
  source: String
}, { collection: 'price_sample' });

module.exports = mongoose.model('Product', productSchema);