const mongoose = require('mongoose');
const generateId = require('../../utils/generateId');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
  },
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
    required: true,
  },
  walletBalance: {
    type: Number,
    default: 0,
  },
  favourites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
  passwordHash: {
    type: String,
    required: true,
  },
}, { timestamps: true });

userSchema.pre('save', function(next) {
    if (!this.userId) {
      this.userId = generateId('USER');
    }
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
