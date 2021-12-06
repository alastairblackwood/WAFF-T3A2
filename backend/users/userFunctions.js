// Require & then initialise
const firebaseClient = require('firebase/app');
firebaseClient.initializeApp(JSON.parse(process.env.FIREBASE_CLIENT_CONFIG));

// Initialised elsewhere, just require it & that's it
const firebaseAdmin = require('firebase-admin');

// CAll it by saying things like
// signUpUser(username:"Something", email:"Something", password:"Something")
async function signUpUser(userDetails) {
  return firebaseAdmin
    .auth()
    .createUser({
      email: userDetails.email,
      password: userDetails.password,
      displayName: userDetails.username,
      emailVerified: true,
      // photoURL: "somefreestockwebsite.com/image.someimage.png"
    })
    .then(async UserRecord => {
      // Set a "custom claim", or authorisation/role data
      let defaultUserClaims = firebaseAdmin
        .auth()
        .setCustomUserClaims(userRecord.uid, {
          admin: false,
          regularUser: true,
        })
        .then(() => {
          console.log('Set default claim to the new user.');
        });
      return UserRecord;
    })
    .catch(error => {
      console.log(`Internal sign-up function error is:\n${error}`);
      return { error: error };
    });
}

module.exports = {
  signUpUser,
};
