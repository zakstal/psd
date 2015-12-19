var socket = require('socket.io');
//var index = require('./index.js');
var main = require('./psdMain');

console.log('initialized');

var mainObj = new main();

var io = socket.listen(3002, function (err, msg) {
    if (err) {
        console.error(err);
    }
});

io.on('connection', function (socket) {
    console.log('a client connected');
    io.emit('load-background', {img: mainObj.deskImgPath});
    socket.on('disconnect', function () {
        console.log('a client disconnected');
    });

    socket.on('test', function(data) {
        console.log('test fired on server', data);
        io.emit('test');
    });
});