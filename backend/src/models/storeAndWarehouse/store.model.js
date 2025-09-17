const mongoose = require('mongoose');
const generateId = require('../../utils/generateId');
const validator = require('validator');


const storeSchema = new mongoose.Schema({
  storeId: {
    type: String,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
    minlength: 10,
    unique: true,
  },
  address: {
    street: { type: String, required: true , maxlength:100, minlength:10},
    city: { type: String , maxlength:50, minlength:2},
    state: { type: String , maxlength:50, minlength:2 },
    postalCode: { type: String , maxlength:8, minlength:6 , required: true},
    country: { type: String, default: 'India' , required: true}
  },
  geolocation: {
    lat: { type: Number },
    lng: { type: Number }
  },
  contact: {
    phone: { type: String , validate(value){
      if(validator.isMobilePhone(value) === false){
        throw new Error('Invalid phone number');
      }
    }},
    email: { type: String , validate(value){
      if(validator.isEmail(value) === false){
        throw new Error('Invalid email address');
      }
    }},
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
