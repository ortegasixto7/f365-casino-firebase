const express = require("express");
const cors = require("cors");
const firebase = require('firebase-admin');

const app = express();

const serviceAccount = require('./f365-casino-test-firebase.json');
firebase.initializeApp({
 credential: firebase.credential.cert(serviceAccount)
});
const firestore = firebase.firestore();

app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.post("/notify", async (req, res) => {
  try {
    await firestore.collection('users').doc(req.body.id).set({ ...req.body });
    res.json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});