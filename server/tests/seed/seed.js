const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
    _id: userOneId,
    email: 'stevewendt@cox.net',
    password: 'userOnePW',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
    }]
}, {
    _id: userTwoId,
    email: 'craig.stearman@cox.net',
    password: 'userTwoPW'
}];

const todos = [{
    _id: new ObjectID,
    text: 'First test todo'
}, {
    _id: new ObjectID,
    text: 'Second test todo',
    completed: true,
    completedAt: 123445
}];

const populateTodos = (done) => { //this wipes out all data in the DB
    Todo.remove({}).then(() => {
        Todo.insertMany(todos);
    }).then(() => done());
};

const populateUsers = (done) => {
    User.remove({}).then(() => {
        let userOne = new User(users[0]).save();
        let userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo])
    }).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};