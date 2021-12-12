// Require & then initialise
const firebaseClient = require('firebase/app');
firebaseClient.initializeApp(JSON.parse(process.env.FIREBASE_CLIENT_CONFIG));
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');

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

async function signInUser(userDetails) {
  const firebaseClientAuth = getAuth();

  let signInResult = signInWithEmailAndPassword(
    firebaseClientAuth,
    userDetails.email,
    userDetails.password
      .then(async userCredentials => {
        let userIdToken = await firebaseClientAuth.currentUser.getIdTokenResult(
          false
        );

        console.log(`userIdToken ob is \n ${JSON.stringify(userIdToken)}`);

        return {
          idToken: userIdToken.token,
          refreshToken: userCredentials.user.refreshToken,
          email: userCredentials.user.email,
          emailVerified: userCredentials.user.emailVerified,
          displayName: userCredentials.user.displayName,
          photoURL: userCredentials.user.photoURL,
          uid: userCredentials.user.uid,
        };
      })
      .catch(error => {
        console.log(`Internal sign-up function error is: \n ${error}`);
        return { error: error };
      })
  );
  return signInResult;
}

module.exports = {
  signUpUser,
  signInUser,
};
