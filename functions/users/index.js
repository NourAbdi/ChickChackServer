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
    console.log("gggggggggggggggggggggggggggggggggggggggggggggggggggggggg");
    const { email, role } = request.query;
    console.log( email, role);
    admin.auth().getUserByEmail(email)
        .then(async userRecord => {
            const uid = userRecord.uid;
            const usersRef = db.collection('users');
            const doc = usersRef.doc(uid);
            const snapshot = await doc.get();
            if (snapshot.exists) {
                const message = `User with email ${email} already exists`;
                console.warn(message);
                response.status(400).send({ success: false, message });
            } else {
                const { displayName } = userRecord;
                const userData = {
                    email,
                    role: role || 'client', // Set default role to "client" if role parameter is not provided
                    ...(displayName && { name: displayName })
                };
                await doc.set(userData);
                const message = `User with email ${email} and role ${userData.role} added successfully`;
                console.log(message);
                response.send({ success: true, message });
            }
        })
        .catch(error => {
            console.error('Error adding user:', error);
            response.status(500).send({ success: false, message: 'Error adding user' });
        });
};
