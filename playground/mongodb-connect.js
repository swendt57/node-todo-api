// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// let obj = new ObjectID(); //alternate way to connect with Destructuring (variables from an objects properties
// console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('unable to connect to mongo server');
    }
    console.log('connected to mongo server');

    // db.collection('Users').insertOne({
    //     name: 'Steve Wendt',
    //     age: 61,
    //     location: 'San Diego'
    // }, (err, results) => {
    //     if(err) {
    //         return console.log('unable to insert user', err);
    //     }
    //
    //     console.log(JSON.stringify(results.ops[0]._id.getTimestamp(), undefined, 4));
    // });

    // db.collection('Todos').insertOne({
    //     text: 'something to do',
    //     completed: false
    // }, (err, results) => {
    //     if(err) {
    //        return console.log('unable to insert todo', err);
    //     }
    //
    //     console.log(JSON.stringify(results.ops, undefined, 4));
    // });

    db.close();
});