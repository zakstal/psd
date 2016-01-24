var element = require('../../element');
var template = require('../../templates');
var _ = require('underscore');

module.exports = element({

    initialize: function () {
        this.template = JST['cssViewer/cssViewer'];
        console.log('initialize css viewer');
        this.render();
    },

    render: function () {
        this.el.innerHTML = this.template();
        this.cssViewer = this.find('.css-viewer')[0];
    },

    show: function (content) {
        this.cssViewer.innerText = content;
    }

});