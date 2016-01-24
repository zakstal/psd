var socket = require('socket.io');
//var index = require('./index.js');
var main = require('./psdMain');

console.log('initialized');

var mainObj = new main();

var io = socket.listen(3003, function (err, msg) {
    if (err) {
        console.error(err);
    }
});

io.on('connection', function (socket) {

    var doc = mainObj.tree.attributes.document;
    io.emit('load-background', {
        img: mainObj.getDeskImgPath(),
        size: {width: doc.width, height: doc.height}
    });

    socket.on('disconnect', function () {
        console.log('a client disconnected');
    });

    socket.on('complete', function (opt) {
        var out = mainObj.findWithin(opt);
        console.log('completed on server', out[0]);
        socket.emit('results', out);
    });

});