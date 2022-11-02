const mongoose = require('mongoose');

// Creating a collection and setting requirements
const Task = mongoose.model('Tasks', {
    description: { 
        type: String,
        required: true,
        trim: true
    }, 

    completed: { 
        type: Boolean,
        default: false,
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

module.exports = Task;