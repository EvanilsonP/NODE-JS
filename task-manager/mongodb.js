const { MongoClient, ObjectID, ObjectId } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => { //Establishing connection to specific server
    if(error) {
        return console.log('Unable to connect to database.');
    }

    const db = client.db(databaseName);                                           // Using the db method to get the connection for the specific database

    // db.collection('users').findOne({ _id: new ObjectId('63597bb4ca600261db742aec')}, (error, user) => {
    //     if(error)
    //         return console.log('Unable to fetch user.');

    //     console.log(user);
    // });

    // db.collection('users').find({age: 23}).toArray((error, users) => {
    //     console.log(users);
    // });

    // db.collection('users').find({age: 23}).count((error, count) => {
    //     console.log(count);
    // });

    db.collection('tasks').findOne({_id: new ObjectId('6359769f63d89b3eda4c094a')}, (error, tasks) => {
        if(error)
            return console.log('Task not found.');

        console.log(tasks);
    });

    db.collection('tasks').findOne({description: "The task is completed"}, (error, task) => {
        if(error)
            return console.log('Not found')

        console.log(task)
    })

});