var io = require('socket.io-client');
var reload = io.connect('http://192.168.0.18:3002');
//TODO: find another solution for connect address;


var makeTag = function (src) {
    console.log('make tag');
    var body = document.getElementsByTagName('body')[0];
    var img = document.createElement('img');
    var parent = document.createElement('div');
    parent.classList.add('psd-main');
    img.src = src;
    parent.appendChild(img);
    body.appendChild(parent);
};

var addImage = function (src) {
      var img = document.querySelectorAll('.psd-main img')[0];
    if (img) {
        console.log('addimage in img', img);
        img.src = src;
        return;
    }

    makeTag(src);
};

reload.on('load-background', function (res) {
    addImage(res.img);
    console.log('res', res);
});