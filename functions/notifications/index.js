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

module.exports.sendToAllClients = async (request, response) => {
    try {
        const message = {
            notification: {
                title: 'Notification Title',
                body: 'Notification Body',
            },
            topic: 'all', // This will send the notification to all devices subscribed to the "all" topic
        };

        const response = await admin.messaging().send(message);
        console.log('Notification sent successfully:', response);
        response.status(200).send('Notification sent successfully');
    } catch (error) {
        console.error('Error sending notification:', error);
        response.status(500).send('Error sending notification');
    }
};
