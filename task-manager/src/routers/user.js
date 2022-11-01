const express = require('express');
const router = new express.Router();
const User = require('../models/user');


// Create user
router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Fetch user by ID
router.get('/users/:id', async (req, res) => {
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
router.get('/users', async (req, res) => {

   try {
      const users = await User.find({});
      res.status(200).send(users);
   } catch (e) {
        res.status(500).send(e);
   }
});

router.patch('/users/:id', async(req, res) => {
    // Preventing non-included fields to be updated
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'});
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id);
        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

        if(!user) {
            return res.status(404).send();
        }
        res.send(user)

    } catch (e) {
        res.status(400).send(e); 
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if(!user) {
            return res.status(404).send();
        }
        res.send(user);

    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;