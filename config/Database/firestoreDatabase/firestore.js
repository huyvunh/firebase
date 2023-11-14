const admin = require("firebase-admin");
const serviceAccount = require("./fir-demo-11e02-firebase-adminsdk-o8201-fdf35e6b20.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin.firestore();
