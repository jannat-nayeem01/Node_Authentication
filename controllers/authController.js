module.exports.signup_get = (req, res) => {
    res.render('signup');
  };
  

const User = require("../models/User");
module.exports.signup_post = async (req, res) => {
const { email, password } = req.body;
try {
const user = await User.create({ email, password }); // create a user basically a async task that’s y
//we choose to wait till out user gets created and store in user.
res.status(201).json(user);
}
catch(err) {
console.log(err);
res.status(400).send('error, user not created');
}
}

//const User = require("../models/User");
// handle errors
const handleErrors = (err) => {
console.log(err.message, err.code);
let errors = { email: '', password: '' };
// duplicate email error
if (err.code === 11000) {
errors.email = 'that email is already registered';
return errors;
}
// validation errors
if (err.message.includes('user validation failed')) {
// console.log(err);
Object.values(err.errors).forEach(({ properties }) => {
// console.log(val);
// console.log(properties);errors[properties.path] = properties.message;
});
}
return errors;
}