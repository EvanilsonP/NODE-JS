const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {

});

const User = mongoose.model('User', {               // Defining a model
    name: {
        type: String
    },

    age: {
        type: Number
    }
});

const me = new User({                               // Creating a instance of the model
    name: 'Evanilson P.',
    age: 23
});

me.save().then(() => {                              // Saving to the database
    console.log(me);
}).catch((e) => {
    console.log(e);
});