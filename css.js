var valid = require('./whiteList');
var addPx = require('./addPx');


module.exports = function (cssObj) {
    return addPx(valid(cssObj));
};