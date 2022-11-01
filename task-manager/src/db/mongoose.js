const mongoose = require('mongoose');

// Connecting mongoose to the database -    Database name
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {});