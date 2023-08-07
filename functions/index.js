const functions = require("firebase-functions");


const { sendToAllClients } = require("./notifications");

const { sendVerificationCode } = require("./authentications");

const { addUser, getUsers, getUserRole } = require("./users");

const { updateShopDetails, getShopsByCityName, getShopMenuByShopUid, getShopByShopUid, getShopByOwnerUid } = require("./shops");

const { getCityByName } = require("./cities");
const { addCity } = require("./cities");

const { getOrdersByUserUid, getOrdersByOrderUid, saveOrder, getPastOrdersByUserUid, getOrdersByShopUid } = require("./orders");


/********************************Notifications servecies***************************************/
exports.sendToAllClients = functions.https.onRequest((request, response) => {
  sendToAllClients(request, response);
});
/********************************Authentications servecies***************************************/
exports.sendVerificationCode = functions.https.onRequest((request, response) => {
  sendVerificationCode(request, response);
});
/********************************Users servecies***************************************/
exports.addUser = functions.https.onRequest((request, response) => {
  addUser(request, response);
});
// exports.getUsers = functions.https.onRequest((request, response) => {
//   getUsers(request, response);
// });
exports.getUserRole = functions.https.onRequest((request, response) => {
  getUserRole(request, response);
});


/********************************Shops servecies***************************************/
// exports.updateShopDetails = functions.https.onRequest((request, response) => {
//   updateShopDetails(request, response);
// });
// exports.getShopsByCityName = functions.https.onRequest((request, response) => {
//   getShopsByCityName(request, response);
// });
// exports.getShopMenuByShopUid = functions.https.onRequest((request, response) => {
//   getShopMenuByShopUid(request, response);
// });
// exports.getShopByShopUid = functions.https.onRequest((request, response) => {
//   getShopByShopUid(request, response);
// });
// exports.getShopByOwnerUid = functions.https.onRequest((request, response) => {
//   getShopByOwnerUid(request, response);
// });

/********************************Cities servecies***************************************/
// exports.getCityByName = functions.https.onRequest((request, response) => {
//   getCityByName(request, response);
// });
// exports.addCity = functions.https.onRequest((request, response) => {
//   addCity(request, response);
// });

/********************************Orders servecies***************************************/
// exports.getOrdersByUserUid  = functions.https.onRequest((request, response) => {
//   getOrdersByUserUid (request, response);
// });
// exports.getOrdersByOrderUid  = functions.https.onRequest((request, response) => {
//   getOrdersByOrderUid (request, response);
// });
// exports.saveOrder  = functions.https.onRequest((request, response) => {
//   saveOrder (request, response);
// });
// exports.getPastOrdersByUserUid  = functions.https.onRequest((request, response) => {
//   getPastOrdersByUserUid (request, response);
// });
// exports.getOrdersByShopUid  = functions.https.onRequest((request, response) => {
//   getOrdersByShopUid (request, response);
// });

