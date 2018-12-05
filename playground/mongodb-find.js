// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// let obj = new ObjectID(); //alternate way to connect with Destructuring (variables from an objects properties
// console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('unable to connect to mongo server');
    }
    console.log('connected to mongo server');

    // db.collection('Todos').find({
    //     _id: new ObjectID('5c074c18329e0673a05f50b8')
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 4));
    // }, err => {
    //     console.log('unable to fetch todos', err);
    // });

    // db.collection('Todos').find({completed: false}).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 4));
    // }, err => {
    //     console.log('unable to fetch todos', err);
    // });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${count}`);
    // }, err => {
    //     console.log('unable to fetch todos', err);
    // });

    db.collection('Users').find({name: 'Steve Wendt'}).toArray().then((docs) => {
        console.log('Users name Steve Wendt' );
        console.log(JSON.stringify(docs, undefined, 4));
    }, err => {
        console.log('unable to fetch count', err);
    });

    // db.close();
});