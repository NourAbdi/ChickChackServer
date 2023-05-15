const admin = require('firebase-admin');
const serviceAccount = require('./service_account');

// Initialize the Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Get a reference to your Firestore database
const db = admin.firestore();

exports.getUsers = (request, response) => {
    const usersRef = db.collection('users');
    usersRef.get()
        .then(snapshot => {
            const users = [];
            snapshot.forEach(doc => {
                users.push(doc.data());
            });
            response.send(users);
        })
        .catch(error => {
            console.error('Error getting users:', error);
            response.status(500).send('Error getting users');
        });
};

exports.addUser = (request, response) => {
    const { uid, email } = request.body;
  
    // Create a reference to the users collection in Firestore
    const usersRef = db.collection('users');
  
    // Check if a user with the given UID already exists in Firestore
    usersRef.doc(uid).get()
      .then(doc => {
        if (doc.exists) {
          // If the user already exists, send an error response
          response.status(400).send('User already exists');
        } else {
          // If the user doesn't exist, add the user to Firestore
          usersRef.doc(uid).set({ email })
            .then(() => {
              // Send a success response
              response.send(`User ${uid} added to Firestore`);
            })
            .catch(error => {
              // If there's an error, send an error response
              console.error('Error adding user to Firestore:', error);
              response.status(500).send('Error adding user to Firestore');
            });
        }
      })
      .catch(error => {
        // If there's an error, send an error response
        console.error('Error checking if user exists:', error);
        response.status(500).send('Error checking if user exists');
      });
  };
