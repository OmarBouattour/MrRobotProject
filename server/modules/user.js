const mongoose = require('mongoose');
// const bcrypt = require('bcrypt-nodejs');

const role = {
    ADMIN: 'admin',
    Reader: 'reader'
  }
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {type : String, required : true , unique : true},
    password: String,
    role: {type : String, enum: ["reader", "admin"]},
});
/*
userSchema.pre('save', function(next) {
    var user = this;
    bcrypt.hash(user.password, null, null, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
}); */

  

module.exports = mongoose.model('user', userSchema, 'users');
