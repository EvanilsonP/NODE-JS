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

const bcrypt = require('bcryptjs');

const myFunction = async () => {
    const password = 'red12345';
    const hashedPassword = await bcrypt.hash(password, 8);

    console.log(password);
    console.log(hashedPassword);

    const isMatch = await bcrypt.compare('red12345', hashedPassword);
    console.log(isMatch);
}

myFunction();