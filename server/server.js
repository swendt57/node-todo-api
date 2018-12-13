var express = require('express');
var bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var  app = express();

app.use(bodyParser.json());

// app.post('/todos', (req, res) => {
//     // console.log("Hello");
//     // console.log(req.body);
//
//     var todo = new Todo({
//         text: req.body.text
//     });
//
//     todo.save().then( (doc) => {
//         res.send(doc);
//     }, (e) => {
//         res.status(400).send(e);
//     });
// });
//
// app.get('/todos', (req, res) => {
//     Todo.find().then((todos) => {
//         res.send({todos})
//     }, (e) => {
//         res.status(400).send(e);
//     });
// });

//GET by passing in parameter
app.get('/todos/:id', (req, res) => {
    let id = req.params.id;

    if( ! ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if( ! todo) {
            res.status(404).send({});
        }
        res.send({todo});
    }).catch((e) => res.status(400).send({}))
});

// User.findById(userID).then((user) => {
//     if( ! user ) {
//         return console.log("User ID not found");
//     }
//     console.log('User by ID:', user);
// }).catch((e) => {console.log(e)});

app.listen(3000, () => {
    console.log('started on port 3000');
});

module.exports = {app};


//*******************Examples from earlier lessons************************

// let testUser = new User({
//     email: '    craig.stearman@cox.net    '
// });
//
// testUser.save().then((doc) => {
//     console.log(JSON.stringify(doc, undefined, 4));
// }, (error) => {
//     console.log('unable to save todo', error);
// });

// let newTodo = new Todo({
//     text: 'Cook dinner'
// });

// newTodo.save().then((doc) => {
//     console.log('Save todo', doc);
// }, (e) => {
//     console.log('unable to save todo');
// });

// let steveTodo = new Todo ({
//     text: 'Learn this stuff',
//     completed: true,
//     completedAt: 123
// });
//
// steveTodo.save().then((doc) => {
//     console.log('Save todo', doc);
// }, (e) => {
//     console.log('unable to save todo');
// });

