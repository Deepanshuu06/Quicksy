const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer',
  },
  walletBalance: {
    type: Number,
    default: 0,
  },
  favourites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
