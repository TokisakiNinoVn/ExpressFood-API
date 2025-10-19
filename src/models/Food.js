const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Food name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Pizza', 'Burger', 'Pasta', 'Salad', 'Dessert', 'Beverage', 'Asian', 'Mexican', 'Other']
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/300'
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: {
    type: Number,
    default: 0
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  preparationTime: {
    type: Number,
    default: 30
  },
  ingredients: [String],
  tags: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('Food', foodSchema);


