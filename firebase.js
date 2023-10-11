var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: "pfm-mmt-c6732",
});

module.exports = admin;

// const verifyIdToken = async (idToken) => {
//   const decodedToken = await admin.auth().verifyIdToken(idToken);
//   return decodedToken.uid;
// };

// // const uid = verifyIdToken(idToken);

// const user = admin.auth().getUser(uid);
// const email = user.email;

// const idToken = req.headers["authorization"];

// console.log(email);
