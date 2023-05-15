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
    const { email, role } = request.query;
    const uid = request.user.uid; // Get the uid from the Firebase Auth token
    const usersRef = db.collection('users');
    const doc = usersRef.doc(uid);
    doc.get()
      .then((snapshot) => {
        if (snapshot.exists) {
          const message = `User with email ${email} already exists`;
          console.warn(message);
          response.status(400).send({ success: false, message });
        } else {
          const userData = {
            email,
            role: role || 'client', // Set default role to "client" if role parameter is not provided
            uid // Include the uid in the user data
          };
          doc.set(userData)
            .then(() => {
              const message = `User with email ${email} and role ${userData.role} added successfully`;
              console.log(message);
              response.send({ success: true, message });
            })
            .catch((error) => {
              console.error('Error adding user:', error);
              response.status(500).send({ success: false, message: 'Error adding user' });
            });
        }
      })
      .catch((error) => {
        console.error('Error adding user:', error);
        response.status(500).send({ success: false, message: 'Error adding user' });
      });
  };
  
