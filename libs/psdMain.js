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
            console.log('find', attrs.name);
            console.log('      top:    ', attrs.top, ' > ', obj.yMin, ' ', attrs.top > obj.yMin);
            console.log('      bottom: ', attrs.bottom, ' < ', obj.yMax, ' ', attrs.bottom < obj.yMax);
            console.log('      left:   ', attrs.left, ' > ', obj.xMin, ' ', attrs.left > obj.xMin);
            console.log('      right:  ', attrs.right, ' < ', obj.xMax, ' ', attrs.right < obj.xMax);
            return ( attrs.top > obj.yMin
                && attrs.bottom < obj.yMax
                && attrs.left > obj.xMin
                && attrs.right < obj.xMax )
                && attrs.top !== Infinity;
        });
    }
};

module.exports = PsdMain;