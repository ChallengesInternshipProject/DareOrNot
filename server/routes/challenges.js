var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Challenge = require('../models/challenges');

router.get('/', function (req, res, next) {
    Challenge.find(function (err, challenge) {
        res.json(challenge);
    });
});

router.get('/clear', function (req, res, next) {
    Challenge.remove(function (err) {
        res.send('cleared');
    })
});

router.post('/create', function (req, res, next) {

    var title = req.param('name');
    var description = req.param('description');
    var friends = req.param('friends');

    var location = {
        lat: req.param('lat'),
        lng: req.param('lng')
    };

    var currentChallenge = new Challenge({
        title: title,
        description: description,
        location: location,
        _creator: req.param('_creator'),
        invitedUsers: friends

    });

    // res.send('ok ?')
    currentChallenge.save(function (err, challenge) {
        res.send('saved');
    });

});

// router.post('/invite/:from/:to', function (req, res, next) {
//
//     var from = req.param('from');
//     var to = req.param('to');
//
//
// });

module.exports = router;
