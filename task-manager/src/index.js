const express = require('express');
const userRouters = require('./routers/user');
const taskRouters = require('./routers/task');
const port = process.env.PORT || 3000;
const app = express();
require('./db/mongoose');

app.use(express.json());
app.use(userRouters);
app.use(taskRouters);

app.listen(port, () => console.log(`Server is up on port ${port}`));

const Task = require('./models/task');
const User = require('./models/user');

const main = async () => {
    // const task = await Task.findById("6362a73f0dad4d64b466de3e");
    // await task.populate("owner")
    // console.log(task.owner);

    const user = await User.findById('6362a6c40dad4d64b466de33');
    await user.populate('tasks');
    console.log(user.tasks);
  };
   
main();