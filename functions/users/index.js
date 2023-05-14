const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

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
  
