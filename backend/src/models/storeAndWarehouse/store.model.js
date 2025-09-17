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
  description: {
    type: String,
    trim: true,
    maxlength: 500,
    default: ''
  },
  logo: {
    type: String,
    default: null,
    validate(value) {
      if (validator.isURL(value) === false) {
        throw new Error("Invalid URL for logo image");
      }
    },
  },
  bannerImage: {
    type: String,
    default: null,
    validate(value) {
      if (validator.isURL(value) === false) {
        throw new Error("Invalid URL for banner image");
      }
    },
  },  
  phone: {
    type: String,
    required: true,
    unique: true,
    trim:true,
    validate(value){
      if(validator.isMobilePhone(value) === false){
        throw new Error('Invalid phone number');
      }
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Invalid email address")
      }
    }
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
  isActive: {
    type: Boolean,
    default: true,
    required: true,
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
