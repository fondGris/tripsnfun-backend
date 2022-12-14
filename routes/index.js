var express = require('express');
var router = express.Router();
require('../models/connection');
const Marker = require('../models/markers');

router.post('/markers', (req, res) => {
    const { token, userName, city, latitude, longitude } = req.body;
    const newMarker = new Marker({ token, userName, city, latitude, longitude });

    newMarker.save().then(() => {
        res.json({ result: true });
    });
});

module.exports = router;
