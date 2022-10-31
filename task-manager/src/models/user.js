const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {               // Defining a model
    name: { 
        type: String, 
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },

    age: { 
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error('Age must be a positive number.')
            }
        }
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(password) {
            if(password.toLowerCase().includes('password')) {
                throw new Error('Passoword cannot contain "password"');
            }
        }
    }
});

module.exports = User;