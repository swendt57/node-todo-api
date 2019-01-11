const mongoose = require('mongoose');
const validator =  require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 1,
        trim: true,
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

    user.tokens = user.tokens.concat([{access, token}]); //Update from class

    return user.save().then(() => {
        return token;
    });
};

UserSchema.methods.removeToken = function(token) {
    let user = this;

    return user.update({
        $pull: {
            tokens: {token}
        }
    });

};

//Model method
UserSchema.statics.findByToken = function(token) {
    let User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, '123abc');

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

    });
};


//NOT WORKING!!!!!!!!!!!!!!!!!!!!!!!!!!
UserSchema.statics.findByCredentials = function(email, password) {
    var User = this;

    // console.log(User.findOne({email: email}));

    return User.findOne({email: email}).then((user) => {

        if( ! user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if(res) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        });
    });
}

UserSchema.pre('save', function(next) {
    let user = this;

    if(user.isModified('password')) {

        let hashedPW = bcrypt.genSalt(10,(err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });

    } else {
        next();
    }
});

let User = mongoose.model('User', UserSchema);

module.exports = {
    User: User
}

//shorthand:
// module.exports = {User};