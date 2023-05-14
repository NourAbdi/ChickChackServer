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
    const body = request.body;
    const { email, password, firstName, lastName } = body;
    admin.auth().createUser({ email, password })
        .then(userRecord => {
            const uid = userRecord.uid;
            const usersRef = db.collection('users');
            const data = { uid, email, firstName, lastName };
            usersRef.doc(uid).set(data)
                .then(() => {
                    response.send(`User ${uid} created`);
                })
                .catch(error => {
                    console.error('Error adding user:', error);
                    response.status(500).send('Error adding user');
                });
        })
        .catch(error => {
            console.error('Error creating user:', error);
            response.status(500).send('Error creating user');
        });
};
