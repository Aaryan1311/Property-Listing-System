const User = require('../models/user.model');
const bcrypt = require('bcrypt');

const findUserByEmail = async (email) => {
    return User.findOne({ email });
};

const createUser = async (userData) => {
    const user = new User(userData);
    await user.save();
    return user;
}

const validatePassword = async (inputPassword, storedPassword) => {
    return await bcrypt.compare(inputPassword, storedPassword);
};

module.exports = {
    findUserByEmail,
    createUser,
    validatePassword
};