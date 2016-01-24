var element = require('../../element');
var template = require('../../templates');
var _ = require('underscore');

module.exports = element({

    initialize: function () {
        this.template = JST['cssViewer/cssViewer'];
        console.log('initialize css viewer yah');
        this.render();
    },

    render: function () {
        this.el.innerHTML = this.template();
    }
});