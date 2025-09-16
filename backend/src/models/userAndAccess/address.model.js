const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required'],
  },
  street: {
    type: String,
    required: [true, 'Street is required'],
    trim: true,
    minlength: [8, 'Street name must be at least 8 characters'],
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
  },
  state: {
    type: String,
    required: [true, 'State is required'],
    trim: true,
  },
  postalCode: {
    type: String,
    required: [true, 'Postal code is required'],
    minlength: [4, 'Postal code must be at least 4 digits'],
    maxlength: [6, 'Postal code cannot exceed 6 digits'],
    match: [/^\d+$/, 'Postal code must be numeric'],
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
}, { timestamps: true });

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;
