const { MongoClient, ObjectId } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => { //Establishing connection to specific server
    if(error) {
        return console.log('Unable to connect to database.');
    }

    const db = client.db(databaseName);                                           // Using the db method to get the connection for the specific database

    // db.collection('users').deleteMany({
    //     age: 23

    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // });

    db.collection('tasks').deleteMany({
        completed: true
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    })
});