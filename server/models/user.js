const mongoose = require('mongoose');
const validator =  require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            // validator: (value) => { //verbose version
            //     validator.isEmail(email)
            // },
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minLength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

//Instance method
UserSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
};

//Instance method
UserSchema.methods.generateAuthToken = function () {
    let user = this;
    let access = 'auth';
    let token = jwt.sign({_id: user._id.toHexString(), access}, '123abc').toString();

    user.tokens = user.tokens.concat([{access, token}]);

    return user.save().then(() => {
        return token;
    });
};

//Model method
UserSchema.statics.findByToken = function(token) {
    let User = this;
    var decoded;

    try {
        console.log('stop');
        decoded = jwt.verify(token, '123abc');
        console.log(`decoded: ${decoded}` );
    }catch(e) {
        return Promise.reject(); //shorthand

        // return new Promise((resolve, reject) => { //verbose method
        //     reject();
        // });
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'

    })
};

let User = mongoose.model('User', UserSchema);

module.exports = {
    User: User
}

//shorthand:
// module.exports = {User};