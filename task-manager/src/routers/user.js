const express = require('express')
const User = require('../models/user')
const router = new express.Router();
const auth = require('../middlewares/auth');
const multer = require('multer');

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});

    } catch (e) {
        res.status(400).send(e)
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});
        
    } catch (e) {
        console.log(e.message)
        res.status(400).send({error: `Incorrect password.`});
    }
});

router.post('/users/logout', auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

router.post('/users/logoutAll', auth, async(req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send();
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id);

        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (e) {
        res.status(500).send();
    }
});

router.patch('/users/me', auth, async (req, res) => {
    // Preventing a non-created field to be updated
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    };

    try {
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        res.send(req.user);

    } catch (e) {
        res.status(400).send(e)
    }
});

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
        
    } catch (e) {
        res.status(500).send();
    }
});

const upload = multer({
    // dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        // Checking if a document is a match 
        // if(!file.originalname.endsWith('.pdf')) {
            if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image.'));
        }
        cb(undefined, true);
    }

});

router.post('/users/me/avatar', auth, upload.single('avatar'), async(req, res) => {
    req.user.avatar = req.file.buffer;
    await req.user.save();
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({error: error.message});
});

router.delet('users/me/avatar', auth, async(req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
});

router.get('/users:id/avatar', async(req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if(!user || user.avatar) {
            throw new Error();
        }
        res.set('Content-Type', 'image/jpg');
        res.send(user.avatar);
    } catch (error) {
        res.status(404).send();
    }
})

module.exports = router;