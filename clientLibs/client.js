var io = require('socket.io-client');
var selector = require('./selector');
var userInterface = require('./ui/uiController');
var reload = io.connect('http://192.168.0.5:3003');
//TODO: find another solution for connect address;

console.log('selector', selector);

var ui = new userInterface();

reload.on('load-background', function (res) {
    ui.addImage(res);
    ui.initCssViewer();
    console.log('res', res);
});

reload.on('results', function (res) {
    console.log('results', res);
    ui.show(res[0]);
});

selector.on('complete', function (opt) {
    reload.emit('complete', opt);
    console.log('completed X', opt.xMax, opt.xMin);
    console.log('completed Y', opt.yMax, opt.yMin);
});