const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

Todo.findOneAndRemove({_id: '5c1ad376ce1bea6f243c802a'}).then(() => {
    console.log(todo);
});

let id = '5c1ad376ce1bea6f243c802a';

Todo.findByIdAndRemove(id).then(() => {
    console.log(todo);
});