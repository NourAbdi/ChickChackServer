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

exports.getShopDetails = (request, response) => {
    const { shopOwnerUid } = request.query;

    const shopsRef = db.collection("shops");
    const query = shopsRef.where("shopOwnerUid", "==", shopOwnerUid);

    query
        .get()
        .then((snapshot) => {
            if (snapshot.empty) {
                response.status(404).send("Shop not found");
            } else {
                const shopData = snapshot.docs[0].data();
                response.send(shopData);
            }
        })
        .catch((error) => {
            console.error("Error getting shop details:", error);
            response.status(500).send("Error getting shop details");
        });
};

exports.updateShopDetails = (request, response) => {
    const { shopUid } = request.query;
    const updatedShopDetails = request.body;
  
    console.log("shopUid:", shopUid);
    console.log("Updated shop details:", updatedShopDetails);
  
    const shopRef = db.collection("shops").doc(shopUid);
  
    shopRef
      .update(updatedShopDetails)
      .then(() => {
        response.send("Shop details updated successfully");
      })
      .catch((error) => {
        console.error("Error updating shop details:", error);
        response.status(500).send("Error updating shop details");
      });
  };
  

