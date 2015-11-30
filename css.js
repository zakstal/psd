var valid = require('./whiteList');
var addPx = require('./adjustStyles');


module.exports = function (cssObj) {
    return adjustStyles(valid(cssObj));
};