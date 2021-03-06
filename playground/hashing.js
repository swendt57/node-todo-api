const {SHA256} = require('crypto-js');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

let password = '123abc';

// bcrypt.genSalt(10,(err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     })
// });

let hashedPassword = '$2a$10$ljYHz.8UHTWyXL6DzERote8kWNTkLFAN72ucW3I1nQaerJNZJdZCi';

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
})

// let data = {
//      id: 10
// };
//
// var token = jwt.sign(data, '123abc');
//
// console.log(token);
//
//
// let decoded = jwt.verify(token, '123abc');
// console.log('decoded: ', decoded);

//EXPERIMENTS

// let message = 'It was a dark and stormy night';
// let hash = SHA256(message).toString();
//
// console.log(`message: ${message}`);
// console.log(`hash: ${hash}`);
//
// let data = {
//     id: 4
// };
//
// let token = {
//     data: data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString() //somesecret part of "Salting the hash"
// }

//Example of what a hacker might do
//the salt will catch the alteration
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(data)).toString();

// let resultHash = SHA256(JSON.stringify(data) + 'somesecret').toString();
//
// if(resultHash === token.hash) {
//     console.log('data was not changed');
// } else {
//     console.log('data WAS changed - danger!');
// }
