var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Challenge = require('../models/challenges');

router.get('/', function (req, res, next) {
    Challenge.find(function (err, challenge) {
        res.json(challenge);
    });
});

router.get('/create', function (req, res, next) {

    var name = req.param('name');
    var description = req.param('description');
    var location = {
        lat: req.param('lat'),
        lng: req.param('lng')
    };

    var currentChallenge = new Challenge({
        name: name,
        description: description,
        location: location
    });

    // res.send('ok ?')
    currentChallenge.save(function (err, challenge) {
        res.send('saved');
    });

});

module.exports = router;
