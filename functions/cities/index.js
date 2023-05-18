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

exports.getCity = (request, response) => {
    const cityName = request.query.cityName; 
  
    const cityRef = db.collection('cities').doc(cityName);
    cityRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const cityData = doc.data();
          response.json(cityData);
        } else {
          response.status(404).send('City not found');
        }
      })
      .catch((error) => {
        console.error('Error getting city:', error);
        response.status(500).send('Error getting city');
      });
  };
  