/**
 * Representation of a tag element.
 *
 * Initializing:
 *
 * To initialize pass in an object to new tag(cssObj)
 * that represents some or all of the css for the tag.
 * The cssObj should come from the psd.js output.
 * valid css tags will be filtered and added to tag.css.
 * the raw obj will be added to tag.obj
 *
 * var tag = new tag(cssObj)
 *
 *
 *
 * Important Methods:
 *
 * tag.addCss(cssObj)
 *
 * will add css to tag.css overwriting any properites that exist
 * in both tag.css and cssObj
 *
 *
 * tag.createChild(cssObj)
 *
 * Creates a new tag and adds it as a child to the current tag.
 * Returns the newly created child tag.
 *
 *
 * tag.getTag(whatStyle)
 *
 * Will return the current tag and all its children in a string
 * rendered as html. Leave whatStyle blank if you want the tags to
 * render without inline styles. Add 'inline' in place of whatStyle
 * to render tags with inline style like so:
 * tag.getTag('inline')
 *
 */
var whiteList = require('./whiteList');

var tag = function (cssObj) {
    this.init(cssObj);
};

tag.prototype = {

    init: function (cssObj) {
        var validCss = whiteList(cssObj);
        this.obj = cssObj;
        this.addCss(validCss);
    },

    tagName: 'div',

    openTag: function () {
        return '<' + this.tagName + '>'
    },

    openTagStyles: function () {
        return '<' + this.tagName + ' ' + this.inlineStyles() + '>'
    },

    closeTag: function () {
        return '</' + this.tagName + '>'
    },

    addCss: function (obj) {
        var _this = this;
        this.css = this.css || {};

        Object.keys(obj).forEach(function (key) {
           _this.css[key] = obj[key];
        });
    },

    inlineStyles: function () {
        return 'style="' + this.cssToString() + '"';
    },

    cssToString: function () {
        var css = this.formatCss();
        return Object.keys(css).reduce(function (str, key) {
            return str + key + ': ' + css[key] + '; ';
        }, '');
    },

    formatCss: function () {
        return adjustStyles(this.css);
    },

    addChild: function (child) {
        child.parent = this;
        this.children = this.children || [];
        this.children.push(child);
    },

    createChild: function (cssObj) {
        var child = new tag(cssObj);
        this.addChild(child);
        return child;
    },

    getTag: function (inline, indent) {
        var inline = inline === 'inline' ? 'openTagStyles' : 'openTag';
        var indentAmt = this.addIndent(indent);
        var indent = indent ? indent : 0;
        var newLine = this.children && this.children.length > 0 ? '\n' : '';
        return indentAmt + this[inline]()
            + this.textNode() + this.getTagChildren('inline', indent + 1)
            + newLine + indentAmt + this.closeTag();
    },

    textNode: function () {
      if (this.css.value) {
          return this.css.value;
      }

        return '';
    },

    getTagChildren: function (inline, indent) {
      if (this.children) {
          return this.children.reverse().reduce(function (str, child) {
              return str + '\n' + child.getTag(inline, indent);
          }, '');
      }

        return '';
    },

    addIndent: function (amt) {

        if (!amt) {
            return '';
        }

        var indent = '';
        for (var i = 0; i < amt; i++) {
            indent = indent + '\t';
        }

        return indent;
    }
};

module.exports = tag;
