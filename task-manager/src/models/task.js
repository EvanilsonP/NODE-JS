const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
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

// Creating a collection and setting requirements
const Task = mongoose.model('Tasks', taskSchema);

module.exports = Task;