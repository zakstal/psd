/**
 *
 */

//var adjustStyles = require('./adjustStyles');
//var whiteList = require('./whiteList');

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
        var newChild = new tag(child);
        //newChild.parent = this;
        this.children.push(newChild);
    },

    each: function (iteratee, callback) {
        var each = Array.prototype.forEach;
        each.call(iteratee, callback);
    },

    reduce: function (iteratee, callback, thing) {
        var reduce = Array.prototype.reduce;
        return reduce.call(iteratee, callback, thing);
    },

    css: function () {
        var str = '';
        var attr;
        for (attr in this.attributes) {
            str = str + '\n' + attr + ': ' + this.attributes[attr] + ';'
        }

        return str;
    },

    find: function (callback) {
        var parent = [];
        if (callback(this.attributes)) {
            parent.push(this.css());
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
