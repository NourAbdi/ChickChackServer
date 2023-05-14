const url = require("url");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./service_account.json");

// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Get a reference to your Firestore database
const db = admin.firestore();

exports.addUser = functions.auth.user().onCreate(async (user) => {
    try {
      const { uid, email } = user;
      const userData = {
        email,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      };
      const userDocRef = admin.firestore().collection("users").doc(uid);
      await userDocRef.set(userData);
      return true;
    } catch (error) {
      console.error("Error adding user data", error);
      return false;
    }
  });

module.exports.getUsers = (request, response) => {
  const usersRef = db.collection("users");
  usersRef
    .get()
    .then((snapshot) => {
      const users = [];
      snapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      response.send(users);
    })
    .catch((error) => {
      console.error("Error getting users:", error);
      response.status(500).send("Error getting users");
    });
};
