var PSD = require('psd');
var tag = require('./tag');
//var utils = require('./utils');
var path = '/Users/USNY-ZStallings/Desktop/westcon\ folder/Final\ Templates/Desktop/westcon_newsroom.psd';
//var path = '/Users/USNY-ZStallings/Desktop/westcon\ folder/Final\ Templates/Desktop/westcon_productcatalog_newfilters.psd';
//var path = 'test.psd';
var imageName = 'main.png';

var PsdMain = function () {
    this.init();
};

PsdMain.prototype = {
    init: function () {
        this.psd = PSD.fromFile(path);
        this.psd.parse();
        var tree = this.psd.tree().export();
        this.tree = new tag(tree);
        this.makePng();
        //console.log(this.tree.children[0]);
    },

    makePng: function () {
        this.psd.image.toPng();
        this.psd.image.saveAsPng(imageName);
        this.deskImgPath = imageName;
    },

    getDeskImgPath: function () {
        return this.deskImgPath;
    },

    findWithin: function (obj) {
        return this.tree.find(function(attrs) {
            return ( attrs.top > obj.Y[0]
                && attrs.bottom < obj.Y[1]
                && attrs.left > obj.X[0]
                && attrs.right < obj.X[1] )
                && attrs.top !== Infinity;
        });
    }
};

module.exports = PsdMain;