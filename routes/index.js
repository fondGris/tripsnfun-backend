var express = require("express");
var router = express.Router();
require("../models/connection");
const Marker = require("../models/markers");

// route pour crée et gardé une localisation d un utilisateur, si c'etait null,
router.post("/markers", (req, res) => {
  const { token, username, latitude, longitude } = req.body;
  Marker.findOne({ token }).then((data) => {
    if (data === null) {
      const newMarker = new Marker({
        token,
        username,
        latitude,
        longitude,
        isConnected: true,
      });
// si route marker inexistant, il crée dans la base de données un nouveau marker
      newMarker.save().then(() => {
        res.json({ result: true });
      });
    } else {
// sinon il mettra à jour avec le token existant la propriété isConnected à true et prendra en compte la nouvelle longitude et latitude 
        Marker.updateOne({
            token},
            {
             isConnected: true,
             latitude,
             longitude
           }).then((data) => {
             res.json({ result: true, data });
           });
    
    }
  });
});
// route pour rechercher tous les markers de la base de données
router.get("/getMarkers", (req, res) => {
  Marker.find().then((data) => {
    if (data) {
      res.json({ result: true, markers: data });
    } else {
      res.json({ result: false, error: "Markers not found" });
    }
  });
});
// route pour la deconnexion, changement du token a false.
router.put("/status/:token", (req, res) => {
  Marker.updateOne({ token: req.params.token}, {isConnected: true }).then(
    (data) => {
      res.json({ result: true, data });
    }
  );
});

router.put("changeMarker/:token", (req,res) => {
    Marker.updateOne({
        token: req.params.token},
        {
         isConnected: true,
         latitude: req.body.latitude,
         longitude: req.body.longitude,
       }).then((data) => {
         res.json({ result: true, data });
       });
})

module.exports = router;
