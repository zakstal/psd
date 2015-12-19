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

    var doc = mainObj.tree.attributes.document;
    io.emit('load-background', {
        img: mainObj.deskImgPath,
        size: {width: doc.width, height: doc.height}
    });

    socket.on('disconnect', function () {
        console.log('a client disconnected');
    });

});