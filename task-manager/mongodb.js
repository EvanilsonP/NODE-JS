const { MongoClient, ObjectId } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => { //Establishing connection to specific server
    if(error) {
        return console.log('Unable to connect to database.');
    }

    const db = client.db(databaseName);                                           // Using the db method to get the connection for the specific database

    // db.collection('users').updateOne({
    //     _id: new ObjectId('63596f15c0cba7abe3f316e7')
    // }, {
    //     // $set: {
    //     //     name: 'Mike'
    //     // }

    //     $inc: {
    //         age: 1
    //     }

    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // })

    db.collection('tasks').updateMany({
        completed: false
    }, {
        $set: {
            completed: true
        }
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    })
});