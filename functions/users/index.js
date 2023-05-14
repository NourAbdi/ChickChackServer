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

module.exports.addUser = (uid, email) => {
  const userRef = db.collection("users").doc(uid);
  userRef
    .set({
      email,
    })
    .then(() => {
      console.log(`User with uid: ${uid} added to the database`);
    })
    .catch((error) => {
      console.error("Error adding user to database:", error);
    });
};

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
