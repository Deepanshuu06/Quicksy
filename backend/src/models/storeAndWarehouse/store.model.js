const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    street: { type: String, required: true },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String, default: 'Unknown' }
  },
  geolocation: {
    lat: { type: Number },
    lng: { type: Number }
  },
  contact: {
    phone: { type: String },
    email: { type: String }
  },
  openingHours: {
    monday: { type: String },
    tuesday: { type: String },
    wednesday: { type: String },
    thursday: { type: String },
    friday: { type: String },
    saturday: { type: String },
    sunday: { type: String }
  }
}, { timestamps: true });

const Store = mongoose.model("Store", storeSchema);
module.exports = Store;
