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