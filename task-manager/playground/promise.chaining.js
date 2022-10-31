require('../src/db/mongoose');
const User = require('../src/models/user');

User.findByIdAndUpdate('635fe45c857c82536417d3b1', { age: 1} ).then((user) => {
    console.log(user);

    return User.countDocuments({age: 1})
}).then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
});