const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// let id = '5c107a34b714abf84c8fac3d';
//
// if( ! ObjectID.isValid(id)) {
//     console.log('ID not valid!!');
// };


// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });
//
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });
//
// Todo.findById(id).then((todo) => {
//     if( ! todo) {
//         return console.log('ID not found');
//     }
//     console.log('Todo by ID', todo);
// }).catch((e) => console.log(e));

//Query Users
let userID = '5c1139186b788ef7e72df049';

User.findById(userID).then((user) => {
    if( ! user ) {
        return console.log("User ID not found");
    }
    console.log('User by ID:', user);
}).catch((e) => {console.log(e)});