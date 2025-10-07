const mongoose = require('mongoose');
const validator = require('validator');
const generateId = require('../../utils/generateId');

const adminSchema = new mongoose.Schema({
    adminId: {
        type: String,
        unique: true
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
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true
    },

    profileURL: {
        type: String,
        default: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
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

    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    },

    role: {
        type: String,
        enum: ['superadmin', 'admin'],
        default: 'admin',
        required:true
    },

    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

adminSchema.pre("save",function(next){
    if(!this.adminId){
        this.adminId = generateId("ADMN")
    }
    next()
})

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
