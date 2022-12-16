var express = require("express");
var router = express.Router();
require("../models/connection");
const Marker = require("../models/markers");

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

      newMarker.save().then(() => {
        res.json({ result: true });
      });
    } 
  });
});

router.get("/getMarkers", (req, res) => {
  Marker.find().then((data) => {
    if (data) {
      res.json({ result: true, markers: data });
    } else {
      res.json({ result: false, error: "Markers not found" });
    }
  });
});

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
