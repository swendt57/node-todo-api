const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

beforeEach((done) => { //does this permanently wipe out all data????!!!! IT DOES!! not a good thing with real data!!
    Todo.remove({}).then(() =>{
        done();
    });
})

describe ('POST /todos', () => {
    it('should create a new todo', (done) => {
        let text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text: text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text)
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            })
    });

    it('should not create a todo with invalid body', (done) => {
        let invalidText = '';

        request(app)
            .post('/todos')
            .send({text: invalidText})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(0);
                    expect(todos === null);
                    done();
                }).catch((e) => done(e));
            });
    });
});