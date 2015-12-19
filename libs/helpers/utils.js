/**
 * Utilities such as getting a random color
 */
(function () {

    var randomNum = function () {
        var num = Math.floor(Math.random() * 100);
        return Math.floor(num / 17);
    };


    module.exports = {
        isEmpty: function (arr) {
            if (arr) {
                return arr.length === 0;
            }

            return false;
        },

        randomColor: function () {
            var codes = {
                0: 'A',
                1: 'B',
                2: 'C',
                3: 'D',
                4: 'E',
                5: 'F'
            };

            var colorCode = '';

            for (var i = 0; i < 6; i++) {
                colorCode = colorCode + codes[randomNum()];
            }

            return colorCode
        }
    }
}());