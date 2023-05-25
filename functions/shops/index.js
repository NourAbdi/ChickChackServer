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

exports.getShopDetailsByOwnerUid = (request, response) => {
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

exports.getShopsByCityName = async (request, response) => {
    try {
        const { cityName } = request.query;

        const shopsRef = db.collection("shops");
        const query = shopsRef.where("city", "==", cityName);
        const snapshot = await query.get();

        if (snapshot.empty) {
            response.status(404).send("No shops found in the city");
            return;
        }

        const fetchedShops = [];
        snapshot.forEach((doc) => {
            const shopData = doc.data();
            fetchedShops.push(shopData);
        });

        response.send(fetchedShops);
    } catch (error) {
        console.error("Error getting shops by city:", error);
        response.status(500).send("Error getting shops by city");
    }
};

exports.getShopMenuByShopUid = async (request, response) => {
    try {
      const { shopUid } = request.query;
  
      const shopsRef = db.collection("shops").doc(shopUid);
      const shopSnapshot = await shopsRef.get();
  
      if (!shopSnapshot.exists) {
        response.status(404).send("Shop not found");
        return;
      }
  
      const shopData = shopSnapshot.data();
      const menuItems = [];
  
      // Fetch menu items based on item references
      for (const itemUid of shopData.menu) {
        const itemRef = db.collection("items").doc(itemUid);
        const itemSnapshot = await itemRef.get();
  
        if (itemSnapshot.exists) {
          const itemData = itemSnapshot.data();
          menuItems.push(itemData);
        }
      }
  
      response.send(menuItems);
    } catch (error) {
      console.error("Error getting shop menu:", error);
      response.status(500).send("Error getting shop menu");
    }
  };
  