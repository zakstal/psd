var PSD = require('psd');
var tag = require('./tag');
//var utils = require('./utils');
var path = '/Users/USNY-ZStallings/Desktop/westcon\ folder/Final\ Templates/Desktop/westcon_newsroom.psd';
//var path = '/Users/USNY-ZStallings/Desktop/westcon\ folder/Final\ Templates/Desktop/westcon_productcatalog_newfilters.psd';
//var path = 'test.psd';
var imageName = 'main.png';

module.exports = PsdMain = function () {
    this.init();
};

PsdMain.prototype = {
    init: function () {
        this.psd = PSD.fromFile(path);
        this.psd.parse();
        var tree = this.psd.tree().export();
        this.tree = new tag(tree);
        this.makePng();
        console.log();

        //console.log('document', docTag.find(function (attrs) {
        //    return (attrs.left === 104) && (attrs.right === 1293);
        //}));
    },

    makePng: function () {
        this.psd.image.toPng();
        this.psd.image.saveAsPng(imageName);
        this.deskImgPath = imageName;
    },

    getDeskImgPath: function () {
        return this.getDeskImgPath();
    }
};