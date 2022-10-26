const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const id = new ObjectID();
console.log(id.id.length);
console.log(id.toHexString().length);

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => { //Establishing connection to specific server
    if(error) {
        return console.log('Unable to connect to database.');
    }

    const db = client.db(databaseName);                                           // Using the db method to get the connection for the specific database

    // db.collection('users').insertOne({                                           // Creating collection and inserting info
    //     name: 'Cristiano Ronaldo',
    //     age: 78
    // }, (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert user!');
    //     }

    //     console.log(result.insertedId);                                           // Shows id
    // });

    // db.collection('users').insertMany([
    // {
    //     'name': 'Laila P.',
    //     'age': 18
    // }, {
    //     'name': 'Evanildo N',
    //     'age': 50
    //    }
    // ], (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert users.')
    //     }

    //     console.log(result.insertedIds);
    // });

//     db.collection('tasks').insertMany([{
//         'description': 'The task is done.',
//         'completed': true
//     }, {
//         'description': 'The task is not completed',
//         'completed': false
//     }, {
//         'description': 'The task is completed',
//         'completed': true
//     }
//   ], (error, result) => {
//         if(error) {
//             return console.log('Unable to insert tasks.');
//         }
//         console.log(result.insertedIds);
//   });

});