const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed.js');

beforeEach(populateUsers);
beforeEach(populateTodos);

// describe ('POST /todos', () => {
//
//     it('should create a new todo', (done) => {
//         let text = 'Test todo text';
//
//         request(app)
//             .post('/todos')
//             .send({text: text})
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body.text).toBe(text)
//             })
//             .end((err, res) => {
//                 if(err) {
//                     return done(err);
//                 }
//
//                 Todo.find({text}).then((todos) => {
//                     expect(todos.length).toBe(1);
//                     expect(todos[0].text).toBe(text);
//                     done();
//                 }).catch((e) => done(e));
//             });
//     });
//
//     it('should not create a todo with invalid body', (done) => {
//         let invalidText = '';
//
//         request(app)
//             .post('/todos')
//             .send({text: invalidText})
//             .expect(400)
//             .end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//
//                 Todo.find().then((todos) => {
//                     expect(todos.length).toBe(2);
//                     expect(todos === null);
//                     done();
//                 }).catch((e) => done(e));
//             });
//     });
// });
//
// describe('GET /todos', () => {
//
//     it('should get all todos', (done) => {
//         request(app)
//             .get('/todos')
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body.todos.length).toBe(2);
//             })
//             .end(done);
//     });
// });
//
// describe('GET /todos/:id', () => {
//
//     it('shopuld return todo doc', (done)=> {
//         request(app)
//             .get(`/todos/${todos[0]._id.toHexString()}`)
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body.todo.text).toBe(todos[0].text);
//             })
//             .end(done);
//     });
//
//     it('should return 404 if todo not found', (done) => {
//         let hexId = new ObjectID().toHexString();
//
//         request(app)
//             .get(`/todos/${hexId}`)
//             .expect(404)
//             .end(done);
//     });
//
//     it('should return 404 for non-object IDs', (done) => {
//         request(app)
//             .get('/todos/1234')
//             .expect(404)
//             .end(done);
//     });
// });
//
// describe('DELETE /todos/:id', () => {
//
//     it('should remove a todo', (done)=> {
//         let hexId = todos[1]._id.toHexString();
//
//         request(app)
//             .delete(`/todos/${hexId}`)
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body.todo._id).toBe(hexId);
//             })
//             .end((err, res) => {
//                 if(err) {
//                     return done(err);
//                 }
//
//                 Todo.findById(hexId).then((todo) => {
//                     expect(todo).toNotExist();
//                     done();
//                 }).catch((e) => done(e));
//
//             });
//     });
//
//     it('should return 404 if todo not found', (done) => {
//         let hexId = new ObjectID().toHexString();
//
//         request(app)
//             .delete(`/todos/${hexId}`)
//             .expect(404)
//             .end(done);
//     });
//
//     it('should return 404 if object id is invalid', (done)=> {
//         request(app)
//             .delete('/todos/1234abc')
//             .expect(404)
//             .end(done);
//     });
// });
//
// describe('PATCH /todos/:id', () => {
//
//     it('should update the todo', (done) => {
//         let hexId = todos[0]._id.toHexString();
//         let textToUpdate = 'yankee doodle dandy';
//
//         request(app)
//             .patch(`/todos/${hexId}`)
//             .send({
//                 completed: true,
//                 text: textToUpdate
//             })
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body.todo).toInclude({text: textToUpdate, completed: true});
//                 expect(res.body.todo.completedAt).toBeA('number');
//             })
//             .end(done);
//     });
//
//     it('should clear completedAt when todo is not completed', (done) => {
//         let hexId = todos[1]._id.toHexString();
//         let textToUpdate = 'it was a dark and stormy night';
//
//         request(app)
//             .patch(`/todos/${hexId}`)
//             .send({
//                 text: textToUpdate,
//                 completed: false
//             })
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body.todo).toInclude({text: textToUpdate, completed: false});
//                 expect(res.body.todo.completedAt).toNotExist();
//             })
//             .end(done);
//     });
//
// });

//private routes
//FIRST NOT WORKING - NEED TO INSTALL MOCHA TEST FRAMEWORK IN ITELLIJ to debug!!!
// describe('GET /users/me', () => {
//     it('should return user, if authenticated', (done) => {
//         request(app)
//             .get('/users/me')
//             .set('x-auth', users[0].tokens[0].token)
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body._id).toBe(users[0]._id.toHexString());
//                 expect(res.body.email).toBe(users[0].email);
//             })
//             .end(done);
//     });
//
//     it('should return 401. if not authenticated', (done) => {
//         request(app)
//             .get('/users/me')
//             //.set('x-auth', users[0].tokens[0].token)
//             .expect(401)
//             .expect((res) => {
//                 expect(res.body).toEqual({});
//             })
//             .end(done);
//     });
// });


describe('POST /users', () => {
    it('should create a user', (done) => {
        let email = 'example@example.com';
        let password = '123mnb!';

        request(app)
            .post('/users')
            .send({email, password})
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist();
                expect(res.body._id).toExist();
                expect(res.body.email).toBe(email);
            })
            .end((err) => {
                if(err) {
                    return done(err);
                }

                User.findOne({email}).then((user) => {
                    expect(user).toExist();
                    expect(user.password).toNotBe(password);
                    done();
                });
            });
    });

    it('should return validation errors if request invalid', (done) => {

        request(app)
            .post('/users')
            .send({
                email: 'something',
                password: '1234'
            })
            .expect(400)
            .end(done);
    });

    it('should not create user if email in use', (done) => {

        let email = users[0].email;
        let password = '123mnb!';

        request(app)
            .post('/users')
            .send({email, password})
            .expect(400)
            .end(done)
    });
})