/**
 *
 */

var adjustStyles = require('./adjustStyles');
var whiteList = require('./whiteList');

var tag = function (cssObj) {
    this.init(cssObj);
};

tag.prototype = {
    init: function (obj) {
        this.addChildren(obj);
        this.addAttrsibutes(obj);
    },

    addAttrsibutes: function (attrs) {
        this.attributes = attrs;
    },

    addChildren: function (obj) {
        if (obj.children) {
            var children = obj.children;
            delete obj.children;
            this.children = this.children || [];
            this.each(children, this.addChild.bind(this));
        }
    },

    addChild: function (child) {
        this.children.push(new tag(child));
    },

    each: function (iteratee, callback) {
        var each = Array.prototype.forEach;
        each.call(iteratee, callback);
    },

    reduce: function (iteratee, callback, thing) {
        var reduce = Array.prototype.reduce;
        return reduce.call(iteratee, callback, thing);
    },


    find: function (callback) {
        var parent = [];
        if (callback(this.attributes)) {
            parent.push(this);
        }

        if (this.children) {
            this.each(this.children, function (child) {
                var arr = child.find(callback);
                parent = parent.concat(arr);
            });
        }


        return parent;
    }
};

module.exports = tag;
