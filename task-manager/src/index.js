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

const multer = require('multer');
const upload = multer({
    dest: 'images'
});

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send();
})