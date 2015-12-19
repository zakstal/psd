var io = require('socket.io-client');
var selector = require('./selector');
var reload = io.connect('http://192.168.0.18:3002');
//TODO: find another solution for connect address;

console.log('selector', selector);

var makeTag = function (res) {
    console.log('make tag');
    var body = document.getElementsByTagName('body')[0];
    var img = document.createElement('img');
    var parent = document.createElement('div');
    parent.classList.add('psd-main');
    parent.style.width = res.size.width;
    parent.style.height = res.size.height;
    img.src = res.img;
    parent.appendChild(img);
    body.appendChild(parent);
};

var addImage = function (res) {
      var img = document.querySelectorAll('.psd-main img')[0];
    if (img) {
        console.log('addimage in img', img);
        img.src = res.src;
        return;
    }

    makeTag(res);
};

reload.on('load-background', function (res) {
    addImage(res);
    console.log('res', res);
});

reload.on('results', function (res) {
    console.log('results', res);
});

selector.on('complete', function (opt) {
    reload.emit('complete', opt);
    console.log('completed', opt);
});