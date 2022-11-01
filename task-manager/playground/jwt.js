const jwt = require('jsonwebtoken');

const myFunction = async () => {
    const token = jwt.sign({_id: 'abc123'}, 'thisismylife', {expiresIn: '7 days'});
    console.log(token);

    const data = jwt.verify(token, 'thisismylife');
    console.log(data);
}

myFunction();