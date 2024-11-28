const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  categories: { type: Array, required: true },
  colors: { type: Array, required: true },
  size: { type: String, required: true },
  brand : { type: String, required: true },
  imagesUrl : { type: Array, required: true },
  date : { type: Number, required: false }
});

module.exports = mongoose.model('Product', productSchema);