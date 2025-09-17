const mongoose = require('mongoose');
const validator = require('validator');

const adminSchema = new mongoose.Schema({
    adminId: {
        type: String,
        required: true,
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
    role: {
        type: String,
        enum: ['superadmin', 'admin'],
        default: 'admin'
    },
    passwordHash: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
