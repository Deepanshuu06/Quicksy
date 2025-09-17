const validator = require("validator");


const signupValidation = (req)=>{
    const {name , phone , email , password} = req.body;

     const ALLOWED_DATA = ["name", "phone", "email", "password"];
    const isAllowed = Object.keys(req.body).every((k) => ALLOWED_DATA.includes(k));
    if (!isAllowed) {
        throw new Error("Invalid data fields in request");
    }
    if(!name){
        throw new Error ("Name is required");
    }else if(name.length<3){
        throw new Error ("Enter Valid Name");

    }else if(!phone){
        throw new Error ("phone is Required");

    }else if(!email){
        throw new Error ("email is Required");

    }else if(!password){
        throw new Error ("password is Required");

    }

    if(!validator.isEmail(email)){
        throw new Error("Enter Valid Email")
    } else if(!validator.isMobilePhone(phone)){
        throw new Error("Enter Valid Phone")
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Enter Strong Password")
    }
}

module.exports = signupValidation

const loginValidation = (req) => {
  const { email, password } = req.body;
  const ALLOWED_FIELDS = ["email", "password"];
  const isAllowed = Object.keys(req.body).every((k) =>
    ALLOWED_FIELDS.includes(k)
  );
  if (!isAllowed) {
    throw new Error("Invalid Fields");
  }
  if (!email) {
    throw new Error("Email Required");
  } else if (!password) {
    throw new Error("Password Required");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Enter Correct Email");
  }
};

module.exports = loginValidation;
    