const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
 
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
    minlength: [6, 'Postal code must be at least 6 digits'],
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
  addressType: {
    type: String,
    enum: ['HOME', 'WORK', 'OTHER'],
    default: 'HOME',
    required: true,
    trim: true,
    maxlength: [10, 'Address type cannot exceed 10 characters'],
    minlength: [4, 'Address type must be at least 4 characters'],
    uppercase: true,
    validate: {
      validator: function(v) {
        return ['HOME', 'WORK', 'OTHER'].includes(v);
      },
      message: props => `${props.value} is not a valid address type!`
    }
  },
}, { timestamps: true });

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;
