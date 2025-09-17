const User = require("../models/userAndAccess/user.model");

exports.register = async (req, res) => {
  const data = req.body;
  try {
    const existingEmail = await User.findOne({ email: data.email });
    if (existingEmail) {
      return res.status(400).send("Email already in use");
    }
    const existingPhone = await User.findOne({ phone: data.phone });
    if (existingPhone) {
      return res.status(400).send("Phone number already in use");
    }
    const ALLOWED_DATA = ["name", "phone", "email", "password"];
    const isAllowed = Object.keys(data).every((k) => ALLOWED_DATA.includes(k));
    if (!isAllowed) {
      return res.status(400).send("Invalid data fields in request");
    }
    const user = new User(data);
    await user.save();
    res.send("User registered successfully");
  } catch (error) {
    res.status(400).send("Error in user registration: " + error.message);
  }
};
exports.login = async (req, res) => {};
exports.logout = async (req, res) => {};
exports.verifyOtp = async (req, res) => {};

