var fs = require('fs');
var PSD = require('psd');
var tag = require('./tag');
var utils = require('./utils');
var path = '/Users/USNY-ZStallings/Desktop/westcon\ folder/Final\ Templates/Desktop/westcon_newsroom.psd';
//var path = '/Users/USNY-ZStallings/Desktop/westcon\ folder/Final\ Templates/Desktop/westcon_productcatalog_newfilters.psd';
//var path = '/Users/USNY-ZStallings/Desktop/wegmens-folder/Final\ global\ Assets/Wegmans-nav-1024_tablet_landscape.psd';
var writePath = 'index.html';


/**
 * Steps to parse a psd from psd.js
 * https://github.com/meltingice/psd.js
 */
var psd = PSD.fromFile(path);
psd.parse();
var tree = psd.tree().export();

var document = tree.document;

/**
 * Output the current psd into a png.
 * This will be used as a background later.
 */
psd.image.toPng();
psd.image.saveAsPng('main.png');


/**
 * Corrects the position of child elements.
 * because the position of all tags are absolute
 * the location of children is rendered from the parents coordinate system.
 * However the children should be rendered from the windows coordinate system.
 * This adjusts their position.
 * @param child
 * @param parent
 */
var correctPosition = function (child, parent) {
    if ((parent.obj.top && parent.obj.left) && (child.css.top || child.css.left)) {
        child.css.top = child.css.top - parent.obj.top;
        child.css.left = child.css.left - parent.obj.left;
    }
};

/**
 * add css attributes to child tags
 * @param child
 */
var addCssToChild = function (child) {
    //child.background = '#' + utils.randomColor();
    child.position = 'absolute';
    //child.overflow = 'hidden';
};

/**
 * Add css attributes to document tag
 * @param tee
 */
var addCssToDocument = function (tee) {
    tree.document.position = 'relative';
    tree.document.overflow = 'hidden';
    tree.document.background = "url('main.png') center no-repeat;";
};

/**
 * This takes json tree output from psd.js and creates
 * nested tag objects.
 * @param tree
 * @param parent
 * @returns {*}
 */
var processTree = function (tree, parent) {
    var newChild;

    if (tree.document) {
        addCssToDocument(tree);
        parent = new tag(tree.document);
    }

    if (tree.children && !utils.isEmpty(tree.children)) {
        tree.children.forEach(function (child) {
            addCssToChild(child );
            newChild = parent.createChild(child);
            correctPosition(newChild, parent);
            processTree(child, newChild);
        });
    }

    return parent;
};


/**
 * gets the tag objects, renders html and writes to
 * to file.
 * @type {*}
 */
var doc = processTree(tree);
var style = '<style>p{ margin: 0;}</style>\n';

var wstream = fs.createWriteStream(writePath);
wstream.write(style + doc.getTag('inline'));
wstream.end();
console.log('Success!');