const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');


const userSchema = new mongoose.Schema({
email: {
type: String,
required: true,
unique: true,
lowercase: true,
validate: [isEmail, 'Please enter a valid email']

},
password: {
type: String,
required: true,
minlength: 6,
}
});


userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
    });

userSchema.post('save', function (doc, next) {
    console.log('new user was created & saved', doc);
    next(); // to get some response after clicking it.
    });
    // fire a function before doc saved to db
    userSchema.pre('save', function (next) {
    console.log('user about to be created & saved', this);
    next();
    });

const User = mongoose.model('User', userSchema);

module.exports = User;