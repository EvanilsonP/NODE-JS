const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {});

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
    }
});

const me = new User({                               // Creating a instance of the model
    name: '                    Evanilson P.',
    email: 'EVANILSONP@GMAIL.COM'
});

me.save().then(() => {                              // Saving to the database
    console.log(me);
}).catch((e) => {
    console.log(e);
});

const Task = mongoose.model('Tasks', {
    description: { type: String }, 
    completed: { type: Boolean }
});

// const task = new Task({
//     description: 'Housecleaning',
//     completed: true
// });

// task.save().then(() => {
//     console.log(task);
// }).catch((e) => {
//     console.log(e);
// })