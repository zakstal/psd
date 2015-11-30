/**
 * Outputs new file with adjusted styles.
 */
(function () {
    var addPxList = {
        left: true,
        right: true,
        top: true,
        bottom: true,
        height: true,
        width: true,
        'font-size': true
    };

    module.exports = function (cssObj) {
        var newObj = {};
        Object.keys(cssObj).forEach(function (key) {
            if (addPxList[key]) {
                return newObj[key] = cssObj[key].toString() + 'px';
            }

            newObj[key] = cssObj[key];
        });

        return newObj;
    }
}());
