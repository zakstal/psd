/**
 * Outputs a new object with only white listed css attributes
 * and any additional attributes.
 */
(function () {
    var whiteList = {
        opacity: true,
        name: true,
        left: true,
        right: true,
        top: true,
        bottom: true,
        height: true,
        width: true,
        position: true,
        background: true,
        overflow: true
    };

    module.exports = function (cssObj) {
        var newObj = {};
        Object.keys(cssObj).forEach(function (key) {
            if (whiteList[key]) {
                return newObj[key] = cssObj[key];
            }

            if (key === 'visible' && cssObj[key] === 'false') {
                return newObj['display'] = 'none';
            }

            /**
             * Adding correct text attributes from psd obj
             */
            if (key === 'text' && cssObj[key] && Object.keys(cssObj[key]).length > 0) {
                var textObj = cssObj[key];
                var text = textObj.value;
                var font = textObj.font;
                var size = font.sizes[0];
                var fontFamily = font.name;
                var color = font.colors[0];
                var alignment = font.alignment;

                newObj['value'] = text;
                newObj['font-size'] = size;
                newObj['font-family'] = fontFamily;
                newObj['color'] = 'rgba(' + color.slice(0, 3).join(',') + ', 1)';
                newObj['text-align'] = alignment[0];

            }
        });

        return newObj;
    }
}());
