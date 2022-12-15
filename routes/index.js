var express = require("express");
var router = express.Router();
require("../models/connection");
const Marker = require("../models/markers");

router.post("/markers", (req, res) => {
  const { token, userName, latitude, longitude } = req.body;
  const newMarker = new Marker({
    token,
    userName,
    latitude,
    longitude,
    isConnected: true,
  });

  newMarker.save().then(() => {
    res.json({ result: true });
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
  Marker.updateOne({ token: req.params.token }, { isConnected: false} , (data) => {
   res.json({ data: data})
  });
});

module.exports = router;
