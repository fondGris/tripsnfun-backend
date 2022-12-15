var express = require('express');
var router = express.Router();
require('../models/connection');
const Marker = require('../models/markers');

router.post('/markers', (req, res) => {
    const { token, userName, city, latitude, longitude } = req.body;
    const newMarker = new Marker({ token, userName, city: null, latitude, longitude });

    newMarker.save().then(() => {
        res.json({ result: true });
    });
});

router.get('/getMarkers', (req, res) => {
    Marker.find().then(data => {
        if(data) {
        res.json({ result : true, markers: data})
        } else {
            res.json({ result: false, error: 'Markers not found' });
          }
    })
})

module.exports = router;
