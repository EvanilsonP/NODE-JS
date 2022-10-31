require('../src/db/mongoose');
const Task = require('../src/models/task');

Task.findOneAndRemove('6360010097ea7d7487ee3114').then((task) => {
    console.log(task);
    return Task.countDocuments({completed: true})
    
}).then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
});