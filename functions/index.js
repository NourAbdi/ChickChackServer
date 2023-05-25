const functions = require("firebase-functions");
const { geocodeRequest } = require("./geocode");
const { placesRequest } = require("./places");
const { payRequest } = require("./pay");

const { addUser, getUsers, getUserRole } = require("./users");

const { updateShopDetails, getShopsByCityName, getShopMenuByShopUid, getShopByShopUid, getShopByOwnerUid } = require("./shops");

const { getCityByName } = require("./cities");

const { getOrdersByUserUid, getOrdersByOrderUid  } = require("./orders");


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
exports.updateShopDetails = functions.https.onRequest((request, response) => {
  updateShopDetails(request, response);
});
exports.getShopsByCityName = functions.https.onRequest((request, response) => {
  getShopsByCityName(request, response);
});
exports.getShopMenuByShopUid = functions.https.onRequest((request, response) => {
  getShopMenuByShopUid(request, response);
});
exports.getShopByShopUid = functions.https.onRequest((request, response) => {
  getShopByShopUid(request, response);
});
exports.getShopByOwnerUid = functions.https.onRequest((request, response) => {
  getShopByOwnerUid(request, response);
});

/********************************Cities servecies***************************************/
exports.getCityByName = functions.https.onRequest((request, response) => {
  getCityByName(request, response);
});

/********************************Orders servecies***************************************/
exports.getOrdersByUserUid  = functions.https.onRequest((request, response) => {
  getOrdersByUserUid (request, response);
});
exports.getOrdersByOrderUid  = functions.https.onRequest((request, response) => {
  getOrdersByOrderUid (request, response);
});