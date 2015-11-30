var addCss = require('./css');
var addPx = require('./addPx');
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
        return addPx(this.css);
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
