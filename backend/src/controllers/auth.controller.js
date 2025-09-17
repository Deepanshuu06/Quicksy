const User = require("../models/userAndAccess/user.model");
const loginValidation = require("../utils/authValidation");
const signupValidation = require("../utils/authValidation");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { name, phone, email, password } = req.body;
  try {
    signupValidation(req);
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).send("Email already in use");
    }
    const existingPhone = await User.findOne({ phone: phone });
    if (existingPhone) {
      return res.status(400).send("Phone number already in use");
    }
    const hashpassword = await bcrypt.hash(password, 10);
   
    const user = new User({ name, phone, email, password:hashpassword});
    await user.save();
    res.send("User registered successfully");
  } catch (error) {
    res.status(400).send("Error in user registration: " + error.message);
  }
};
exports.login = async (req, res) => {
  const {email , password} = req.body;
try {
    loginValidation(req);
    const user = await User.findOne({email:email});
    if(!user){
        throw new Error ("Invalid Credentials")
    }
     const isPasswordValid = await bcrypt.compare(password, user.password);

     if(isPasswordValid){
        res.send("login successfull")
     }else{
        throw new Error ("Invalid Credentials")
     }
    
} catch (error) {
    throw new Error ("Error " + error.message)
}
};

exports.logout = async (req, res) => {};


