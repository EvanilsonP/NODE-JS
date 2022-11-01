const express = require('express');
require('./db/mongoose');
const app = express();

const port = process.env.PORT || 3000;
const User = require('./models/user');
const Task = require('./models/task');


app.use(express.json());

// Create user
app.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Fetch user by ID
app.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const usersId = await User.findById(_id);

        if(!usersId) {
            return res.status(404).send();
        }
        res.status(200).send(usersId);

    } catch (e) {
        res.status(500).send(e);
    }
    
});

// Fetch all users
app.get('/users', async (req, res) => {

   try {
      const users = await User.find({});
      res.status(200).send(users);
   } catch (e) {
        res.status(500).send(e);
   }
});

// Create task
app.post('/tasks', (req, res) => {
    const task = new Task(req.body);

    task.save().then(() => {
        res.status(201).send(task);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

// Fetch all tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).send(tasks);
    } catch (e) {
       res.status(500).send(e); 
    }
});

// Fetch task by ID
app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findById(_id);
        if(!task) {
            return res.status(404).send();
        }
        res.send(task);

    } catch (error) {
        res.status(500).send(e);
    }
});



app.listen(port, () => console.log(`Server is up on port ${port}`));
