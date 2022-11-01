require('../src/db/mongoose');
const User = require('../src/models/user');

// User.findByIdAndUpdate('635fe45c857c82536417d3b1', { age: 1} ).then((user) => {
//     console.log(user);

//     return User.countDocuments({age: 1})
// }).then((result) => {
//     console.log(result);
// }).catch((e) => {
//     console.log(e);
// });

const updateAndCount = async(id, age) => {
    const user = await User.findByIdAndUpdate(id, {age: age});
    const count = await User.countDocuments({age});
    return count;
};

updateAndCount('635fdb3bde39812f733bac40', 2).then((count) => {
    console.log(count);
}).catch((e) => {
    console.error(e);
});