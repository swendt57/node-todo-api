// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// let obj = new ObjectID(); //alternate way to connect with Destructuring (variables from an objects properties
// console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('unable to connect to mongo server');
    }
    console.log('connected to mongo server');

    // //deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);;
    // });

    //deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);;
    // });

    //findOneAndDelete - returns document removed
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);;
    // });

    // db.collection('Users').deleteMany({name: 'Steve Wendt'}).then((result) => {
    //     console.log(result);;
    // });

    db.collection('Users').findOneAndDelete({_id: new ObjectID('5c0751a1329e0673a05f52ac')}).then((result) => {
        console.log(JSON.stringify(result, undefined, 4));
    });

    // db.close();
});