const mongoose = require("mongoose");
const validator = require("validator");

const generateId = require("../../utils/generateId");

const deliveryPartnerSchema = new mongoose.Schema(
  {
    partnerId: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (validator.isMobilePhone(value) === false) {
          throw new Error("Invalid phone number");
        }
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address");
        }
      },
    },
    profileImage: {
      type: String,
      default: null,
      validate(value) {
        if (validator.isURL(value) === false) {
          throw new Error("Invalid URL for profile image");
        }
      },
    },
    licenseNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    ordersDelivered: {
      type: Number,
      default: 0,
    },
    pastOrders: [
      {
        orderId: {
          type: String,
          required: true,
        },
        deliveryDate: {
          type: Date,
          required: true,
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
      },
    ],
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    currentLocation: {
      lat: { type: Number },
      lng: { type: Number },
    },
    currentOrder: {
        orderId: {
            type: String,
            default: null
        },
        pickupLocation: {
            lat: { type: Number },
            lng: { type: Number }
        },
        dropLocation: {
            lat: { type: Number },
            lng: { type: Number }
        },
        status: {
            type: String,
            enum: ["pending", "picked-up", "delivered"],
            default: "pending"
        }
    },
    availabilityStatus: {
      type: String,
      enum: ["available", "unavailable", "on-duty"],
      default: "unavailable",
    },
    vehicleType: {
      type: String,
      enum: ["bike", "car", "van", "truck"],
      required: true,
    },
    vehicleNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

deliveryPartnerSchema.pre("save", function (next) {
  if (!this.userId) {
    this.userId = generateId("DPART");
  }
  next();
});

const DeliveryPartner = mongoose.model(
  "DeliveryPartner",
  deliveryPartnerSchema
);
module.exports = DeliveryPartner;
