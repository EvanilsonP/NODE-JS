const express = require('express');
const userRouters = require('./routers/user');
const taskRouters = require('./routers/task');
const User = require('./models/user');
const Task = require('./models/task');
const port = process.env.PORT || 3000;
const app = express();
require('./db/mongoose');

app.use(express.json());
app.use(userRouters);
app.use(taskRouters);

app.listen(port, () => console.log(`Server is up on port ${port}`));

const jwt = require('jsonwebtoken');

const myFunction = async () => {
    const token = jwt.sign({_id: 'abc123'}, 'thisismylife', {expiresIn: '7 days'});
    console.log(token);

    const data = jwt.verify(token, 'thisismylife');
    console.log(data);
}

myFunction();