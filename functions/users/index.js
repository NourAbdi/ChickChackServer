const admin = require('firebase-admin');
const serviceAccount = require('../service_account.json');

// Initialize the Firebase Admin SDK if it's not already initialized
if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }

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
    const { uid, email, role } = request.body;

    const usersRef = db.collection('users');

    usersRef
        .doc(uid) // Use uid as the document name
        .get()
        .then((docSnapshot) => {
            if (docSnapshot.exists) {
                const message = ` with email ${email} already exists`;
                console.warn(message);
                response.status(400).send({ success: false, message });
            } else {
                const userData = {
                    uid,
                    email,
                    role
                };

                usersRef
                    .doc(uid) // Use uid as the document name
                    .set(userData)
                    .then(() => {
                        const message = `User with email ${email} and role ${userData.role} added successfully`;
                        response.send({ success: true, message });
                    })
                    .catch((error) => {
                        console.error(`Error adding user: ${error}`);
                        response.status(500).send({ success: false, message: 'Error adding user' });
                    });
            }
        })
        .catch((error) => {
            console.error(`Error checking user existence: ${error}`);
            response.status(500).send({ success: false, message: 'Error checking user existence' });
        });
};

exports.getUserRole = (request, response) => {
    const { uid } = request.query;

    const userDocRef = db.collection('users').doc(uid);
    userDocRef
        .get()
        .then((userDocSnapshot) => {
            if (userDocSnapshot.exists) {
                const userData = userDocSnapshot.data();
                const role = userData.role;
                return response.json(role);
            } else {
                response.status(404).send('User document does not exist');
            }
        })
        .catch((error) => {
            console.error('Error retrieving user role:', error); // Add this line to log the error
            response.status(500).send('Error retrieving user role');
        });
};
