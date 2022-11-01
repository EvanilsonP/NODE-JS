const express = require('express');
const userRouters = require('./routers/user');
const taskRouters = require('./routers/task');
const User = require('./models/user');
const Task = require('./models/task');
const port = process.env.PORT || 3000;
const app = express();
require('./db/mongoose');

// app.use((req, res, next) => {
//     if(req.method === 'GET') {
//         res.send('GET requests are disabled.');
//     } else {
//         next();
//     }
// });

app.use((req, res, next) => {
    if(req.method === 'GET' || req.method === 'POST' || req.method === 'PATCH' || req.method === 'DELETE' ) {
        res.status(503).send('Site is currently down. Check back soon.');
    } else {
        next();
    }
});

app.use(express.json());
app.use(userRouters);
app.use(taskRouters);

app.listen(port, () => console.log(`Server is up on port ${port}`));