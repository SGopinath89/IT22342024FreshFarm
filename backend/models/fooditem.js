// models/foodItem.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodItemSchema = new Schema({
  foodName: {
    type: String,
    required: true
  },
  pricePerKilo: {
    type: Number,
    required: true
  },
  unitsInKilos: {
    type: Number,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  }
});

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

module.exports = FoodItem;
