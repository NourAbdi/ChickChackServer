const admin = require('firebase-admin');
const serviceAccount = require('../service_account.json');
const url = require("url");

// Initialize the Firebase Admin SDK if it's not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

// Get a reference to your Firestore database
const db = admin.firestore(); 

module.exports.getCityByName = (request, response) => {
  const cityName = request.query.cityName;

  const cityRef = db.collection('cities').where('cityName', '==', cityName);
  cityRef
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        response.status(404).send('City not found');
      } else {
        const cities = [];
        snapshot.forEach((doc) => {
          const cityData = doc.data();
          cities.push(cityData);
        });
        response.json(cities);
      }
    })
    .catch((error) => {
      console.error('Error getting city:', error);
      response.status(500).send('Error getting city');
    });
};

module.exports.addCity = (request, response) => {
  const cityName = request.body.cityName;
  const location = new admin.firestore.GeoPoint(request.body.latitude, request.body.longitude);
  const shopsUid = request.body.shopsUid;
  const swiperPhoto = request.body.swiperPhoto;

  const cityRef = db.collection('cities').doc();

  cityRef
    .set({
      cityName: cityName,
      cityUid: cityRef.id,
      location: location,
      shopsUid: shopsUid,
      swiperPhoto: swiperPhoto,
    })
    .then(() => {
      response.status(200).send('City added successfully');
    })
    .catch((error) => {
      console.error('Error adding city:', error);
      response.status(500).send('Error adding city');
    });
};
