const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {});



// const me = new User({                               // Creating a instance of the model
//     name: '                    Evanilson P.  ',
//     email: '  EVANILSONP@GMAIL.COM  ',
//     password: '      IWishIWereRich  '
// });

// me.save().then(() => {                              // Saving to the database
//     console.log(me);
// }).catch((e) => {
//     console.log(e);
// });

const Task = mongoose.model('Tasks', {
    description: { 
        type: String,
        required: true,
        trim: true
    }, 
    completed: { 
        type: Boolean,
        default: false,
    }
});

const task = new Task({
    description: '   eat lunch ',
});

task.save().then(() => {
    console.log(task);
}).catch((e) => {
    console.log(e);
})