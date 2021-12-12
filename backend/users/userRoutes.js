const express = require('express');
const userController = require('./../controllers/userController');

const router = express.Router();

const { signUpUser, signInUser } = require('./userFunctions');

router.route('/').get(userController.getAllUsers);
// .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.post('/sign-up', async (req, res) => {
  let newUserDetails = {
    email: request.body.email,
    password: request.body.password,
    username: request.body.username,
  };

  if (newUserDetails.password.length < 8) {
    console.log('Password too short!');
    response.json({ error: 'Password too short!' });
  }

  let signUpResult = await signUpUser(newUserDetails);

  if (signUpResult.error != null) {
    console.log('Sign up failed, returning error to requester');
    response.json(signUpResult);
    return;
  }

  let signInResult = await signInUser(newUserDetails);

  if (signInResult.error != null) {
    console.log('Sign in failed, returning error to requester');
    response.json(signInResult);
    return;
  }

  response.json(signInResult);
});

router.post('/sign-in', async (req, res) => {
  let existingUserDetails = {
    email: request.body.email,
    password: request.body.password,
  };

  let signInResult = await signInUser(existingUserDetails);

  if (signInResult.error != null) {
    console.log('Sign in failed, returning error to requester');
    response.json(signInResult);
    return;
  }
  response.json(signInResult);
});

module.exports = router;
