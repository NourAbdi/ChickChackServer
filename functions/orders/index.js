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

module.exports.getOrdersByOrderUid = async (request, response) => {
    const { orderUid } = request.query;
    try {
        const orderDoc = await db.collection('orders').doc(orderUid).get();

        if (!orderDoc.exists) {
            return response.status(404).json({ error: 'Order not found' });
        }

        const orderData = orderDoc.data(); // Retrieve the data from the order document

        response.json(orderData); // Send the order data as a response
    } catch (error) {
        console.error('Error getting orders:', error);
        response.status(500).json({ error: 'Failed to get orders' });
    }
};


module.exports.getOrdersByUserUid = async (request, response) => {
    const { userUid } = request.query;

    try {
        const userDoc = await db.collection('users').doc(userUid).get();

        if (!userDoc.exists) {
            return response.status(404).json({ error: 'User not found' });
        }

        const userData = userDoc.data();
        const ordersUid = userData.ordersUid || [];

        const orderDocs = await Promise.all(ordersUid.map(orderUid => db.collection('orders').doc(orderUid).get()));

        const orders = orderDocs.map(orderDoc => orderDoc.data());

        response.json(orders);
    } catch (error) {
        console.error('Error getting orders:', error);
        response.status(500).json({ error: 'Failed to get orders' });
    }
};

module.exports.saveOrder = async (request, response) => {
    const { order } = request.body;

    try {
        const orderRef = await db.collection("orders").add(order);
        const orderUid = orderRef.id;
        response.json({ orderUid });
    } catch (error) {
        console.error("Error saving order:", error);
        response.status(500).json({ error: "Failed to save the order" });
    }
};

module.exports.getPastOrdersByUserUid = async (request, response) => {
    const { userUid } = request.query;

    try {
        const ordersSnapshot = await db
            .collection("orders")
            .where("userUid", "==", userUid)
            .get();

        const orders = ordersSnapshot.docs.map((doc) => doc.data());

        response.json({ orders });
    } catch (error) {
        console.error("Error getting past orders:", error);
        response.status(500).json({ error: "Failed to get past orders" });
    }
};

