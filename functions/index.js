const functions = require("firebase-functions");
const { geocodeRequest } = require("./geocode");
const { placesRequest } = require("./places");
const { payRequest } = require("./pay");
const { addUser,getUsers,getUserRole } = require("./users");
const { getShopDetails } = require("./shops");
const { updateShopDetails } = require("./shops");

const { Client } = require("@googlemaps/google-maps-services-js");
// const stripeClient = require("stripe")(functions.config().stripe.key);
// const googleClient = new Client({});

exports.geocode = functions.https.onRequest((request, response) => {
  geocodeRequest(request, response);
});

exports.placesNearby = functions.https.onRequest((request, response) => {
  placesRequest(request, response);
});

exports.pay = functions.https.onRequest((request, response) => {
  payRequest(request, response, stripeClient);
});


/********************************Users servecies***************************************/
exports.addUser = functions.https.onRequest((request, response) => {
  addUser(request, response);
});
exports.getUsers = functions.https.onRequest((request, response) => {
  getUsers(request, response);
});
exports.getUserRole = functions.https.onRequest((request, response) => {
  getUserRole(request, response);
});


/********************************Shops servecies***************************************/
exports.getShopDetails = functions.https.onRequest((request, response) => {
  getShopDetails(request, response);
});
exports.updateShopDetails = functions.https.onRequest((request, response) => {
  updateShopDetails(request, response);
});