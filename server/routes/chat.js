var express = require('express');
var router = express.Router();
var io = require('socket.io')(1337);
var Message = require('../models/message');


io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('message', function (msg) {
        io.emit('message', msg);
        console.log(msg);
    });

    socket.on('private message', function (fron, msg) {
        // io.emit('message', msg);
        console.log('I received a private message by ', from, ' saying ', msg);
    });

    socket.on('clear', function () {
        io.emit('clear', 'the clear response');
        console.log('clearing all messages');
    });
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

/* GET home page. */
router.get('/', function (req, res, next) {
    Message.find(function (err, messages) {
        res.send(messages);
    });
});

router.get('/clients', function (req, res, next) {
    //TODO add list of connected clients
    res.send('Clients');
});

router.get('/submit', function (req, res, next) {
    var message = new Message({
        id: req.param('id'),
        message: req.param('message'),
        sender: req.param('sender'),
        reciever: req.param('reciever')
    });

    message.save(function (err) {
        if(err){
            return res.send(err);
        }else{
            return res.send('saved');
        }
    });
});

router.get('/clear', function (req, res, next) {
    Message.remove(function (err) {
        res.send('messages removed');
    })
});

module.exports = router;