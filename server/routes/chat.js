var express = require('express');
var router = express.Router();
var io = require('socket.io')(1337);
var Message = require('../models/message');
var UserList = require('../models/userList');

io.on('connection', function (socket) {
    var addedUser = false;
    // console.log(socket.id + ' connected');
    io.emit('clientConnect', {id: socket.id});


    // setInterval(function () {
    //     io.emit('room1', new Date);
    // }, 1000);

    // socket.on('switch room', function (room) {
    //     console.log(room);
    //     socket.join(room);
    //     console.log(socket.id + " joined " + room)
    //     io.sockets.in(room).emit('private message', 'welcome !');
    //
    // });
    socket.on('private message', function (room) {
        console.log(room);
        socket.join(room);
        console.log(socket.id + " joined " + room)

        io.sockets.in(room).emit('private message', 'pm from ' + socket.id);
    });


    socket.on('leave room', function (room) {

        socket.leave(room);
        console.log(socket.id + " left " + room)

    });


    socket.on('message', function (msg) {
        io.emit('message', {
            id: socket.username,
            // testID: socket.id,
            msg: msg.msg
        });
        console.log(socket.username);
    });

    socket.on('add user', function (username) {
        if (addedUser) return;
        socket.username = username;
        addedUser = true;

        var newUser = new UserList({
            user: socket.username,
            socketID: socket.id
        });
        newUser.save();
        io.emit('new user', 'has connected');
    });

    socket.on('say to someone', function (id, msg) {
        socket.broadcast.to(id).emit('my message', msg);
    });

    socket.on('clear', function () {
        io.emit('clear', 'the clear response');
        console.log('clearing all messages');
    });
    socket.on('disconnect', function () {
        console.log(socket.username + ' disconnected');
        UserList.find({user: socket.username}).remove().exec();
        io.emit('dc user', {
            user: socket.username,
            id: socket.id
        });
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
    UserList.find({}, function (err, users) {
        res.send(users);
    });
});
router.get('/client/:user', function (req, res, next) {
    //TODO add list of connected clients
    var client = req.params.user;

    UserList.findOne({user: client}, function (err, user) {
        res.json(user);
    });
});

router.get('/submit', function (req, res, next) {
    var message = new Message({
        id: req.param('id'),
        message: req.param('message'),
        sender: req.param('sender'),
        reciever: req.param('reciever')
    });

    message.save(function (err) {
        if (err) {
            return res.send(err);
        } else {
            return res.send('saved');
        }
    });
});

router.get('/messages/:from/:to', function (req, res, next) {
    var from = req.param('from');
    var to = req.param('to');


    Message.find({})
        .where('sender')
        .in([from, to])
        .exec(function (err, data) {
            res.send(data);
        });


    // Message.find({
    //     sender: {$all: [from, to]}
    // }, function (err, messages) {
    //     res.json(messages);
    // });
});

router.get('/clear', function (req, res, next) {
    Message.remove(function (err) {
        res.send('messages removed');
    })
});

module.exports = router;