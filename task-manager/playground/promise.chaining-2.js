require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.findOneAndRemove('6360010097ea7d7487ee3114').then((task) => {
//     console.log(task);
//     return Task.countDocuments({completed: true})
    
// }).then((result) => {
//     console.log(result);
// }).catch((error) => {
//     console.log(error);
// });

const deleteTaskAndCount = async(id) => {
    const task = await Task.findOneAndRemove(id);
    const count = await Task.countDocuments({ completed: false});
    return count;
}

deleteTaskAndCount('636002bbb7371babea214ac4').then((count) =>{
    console.log(count);
}).catch((e) => {
    console.log(e);
});