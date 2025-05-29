const { findUserByEmail, createUser, validatePassword } = require('../services/auth.service');
const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const { SuccessResponse } = require('../utils/common'); 

const signUp = async (req, res) => {


    const errorResponse = { ...ErrorResponse };
    const successResponse = { ...SuccessResponse };


    const { name, email, password } = req.body;

    try {
        const existingUser = await findUserByEmail(email);
        if (existingUser) {

            errorResponse.message = ('User already exists');
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse);
        }

        const newUser = await createUser({ name, email, password });

        successResponse.data = newUser;
        successResponse.message = 'User created successfully';
        console.log('User saved:', newUser);
        return res
            .status(StatusCodes.OK)
            .json({ successResponse });


    } catch (error) {
        console.error('Error during sign up:', error);

        errorResponse.message = 'Something went wrong while adding a user.';
        errorResponse.error = error;

        return res
        .status(error.statusCode)
        .json({ errorResponse });    
    }
}

const signIn = async (req, res) => {
    const errorResponse = { ...ErrorResponse };
    const successResponse = { ...SuccessResponse };

    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);
        if (!user) {
            errorResponse.message = 'User not found';
            return res
                .status(StatusCodes.NOT_FOUND)
                .json(errorResponse);
        }

        const isPasswordValid = await validatePassword(password, user.password);
        if (!isPasswordValid) {
            errorResponse.message = 'Invalid email or password';
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json(errorResponse);
        }

        const token = user.generateAuthToken();

        successResponse.data = { user, token };
        successResponse.message = 'Login successful';

        return res
            .status(StatusCodes.OK)
            .json(successResponse);

    } catch (error) {
        console.error('Error during sign in:', error);

        errorResponse.message = 'Something went wrong while signing in.';
        errorResponse.error = error;

        return res
            .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ errorResponse });
    }
}

module.exports = {
    signUp,
    signIn
};