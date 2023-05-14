const url = require("url");
const functions = require("firebase-functions");

const admin = require('firebase-admin');
const serviceAccount = require('./service_account.json');

// Initialize the Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Get a reference to your Firestore database
const db = admin.firestore();

// Now you can use the Firebase Firestore API to read and write data to your database
const collectionRef = db.collection('my-collection');
collectionRef.add({
    name: 'John Doe',
    age: 30
})
    .then(docRef => {
        console.log(`Document written with ID: ${docRef.id}`);
    })
    .catch(error => {
        console.error('Error adding document:', error);
    });




module.exports.getUsers = (request, response) => {
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