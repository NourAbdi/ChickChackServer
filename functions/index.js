const functions = require("firebase-functions");
const { geocodeRequest } = require("./geocode");
const { placesRequest } = require("./places");
const { payRequest } = require("./pay");
const { addUser,getUsers,getUserRole } = require("./users");

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

exports.addUser = functions.https.onRequest((request, response) => {
  addUser(request, response);
});

exports.getUsers = functions.https.onRequest((request, response) => {
  getUsers(request, response);
});

exports.getUserRole = functions.https.onRequest((request, response) => {
  getUserRole(request, response);
});
