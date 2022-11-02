const express = require('express');
const router = new express.Router();
const Task = require('../models/task');
const auth = require('../middlewares/auth');


// Create task
router.post('/tasks', auth, async(req, res) => {
    // const task = new Task(req.body);
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(e);
    }
});

// Fetch all tasks
router.get('/tasks', auth, async (req, res) => {
    try {
        await req.user.populate('tasks');
        res.status(200).send(req.user.tasks);

    } catch (e) {
       res.status(500).send(e); 
    }
});

// Fetch task by ID
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findOne({_id, owner: req.user._id});
        if(!task) {
            return res.status(404).send();
        }
        res.send(task);

    } catch (error) {
        res.status(500).send(e);
    }
});


router.patch('/tasks/:id', auth, async(req, res) => {
    // Preventing non-included fields to be updated
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates! Try again.'});
    }

    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id}); // Finding a task and owner

        if(!task) {
            return res.status(404).send();
        }

        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();
        res.send(task)

    } catch (e) {
        res.status(400).send(e); 
    }
});

router.delete('/tasks/:id', auth, async(req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id}); // Deleting a task a user created and not being allowed to delete someone's else task

        if(!task) {
            res.send(404).send()
        }
        res.send(task);

    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;