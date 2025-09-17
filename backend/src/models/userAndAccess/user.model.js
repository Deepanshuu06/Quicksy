const mongoose = require("mongoose");
const generateId = require("../../utils/generateId");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
      trim: true,
    },
    profileImage: {
      type: String,
      default:
        "https://www.google.com",
      validate(value) {
        if (validator.isURL(value) === false) {
          throw new Error("Invalid URL for profile image");
        }
      },
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
    walletBalance: {
      type: Number,
      default: 0,
      max: 100000,
    },
    favourites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 12,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (!this.userId) {
    this.userId = generateId("USER");
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
