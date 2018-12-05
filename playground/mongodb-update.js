// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// let obj = new ObjectID(); //alternate way to connect with Destructuring (variables from an objects properties
// console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('unable to connect to mongo server');
    }
    console.log('connected to mongo server');

    //findOneAndUpdate

    // db.collection('Todos').findOneAndUpdate(
    //     {_id: new ObjectID('5c08043a329e0673a05f5681')
    //     }, {
    //         $set: {
    //             completed: true
    //         }
    //     }, {
    //         returnOriginal: false
    //     }).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndUpdate(
        {name: 'Craig'
        }, {
            $set: {name: 'Pugsley'},
            $inc: {age: 1}
        }, {
            returnOriginal: false
        }).then((result) => {
        console.log(result);
    });


    // db.close();
});