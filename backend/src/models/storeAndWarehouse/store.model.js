const mongoose = require('mongoose');
const generateId = require('../../utils/generateId');

const storeSchema = mongoose.Schema({
  storeId: {
    type: String,
    unique: true
  },
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

storeSchema.pre('save', function(next) {
    if (!this.storeId) {
      this.storeId = generateId('STORE');
    }
    next();
});

const Store = mongoose.model("Store", storeSchema);
module.exports = Store;
