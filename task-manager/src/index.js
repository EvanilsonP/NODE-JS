const express = require('express');
require('./db/mongoose');
const app = express();

const port = process.env.PORT || 3000;
const User = require('./models/user');
const Task = require('./models/task');


app.use(express.json());

// Create user
app.post('/users', (req, res) => {
    const user = new User(req.body);

    user.save().then(() => {
        res.status(201).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

// Fetch user by ID
app.get('/users/:id', (req, res) => {
    const _id = req.params.id

    User.findById(_id).then((user) => {
        if(!user) {
            return res.status(404).send();
        }

        res.send(user);

    }).catch((e) => {
        res.status(500).send();
    })
});

// Fetch all users
app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users);
    }).catch((e) => {
        res.status(400).send(e);
    });
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
app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.status(200).send(tasks);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

// Fetch task by ID
app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id;

    Task.findById(_id).then((task) => {
        if(!task) {
            res.status(404).send();
        }
        res.send(task);
    }).catch((e) => {
        res.status(500).send();
    })
});



app.listen(port, () => console.log(`Server is up on port ${port}`));
