(function () {
    'use strict';

    var selector = function () {
        this.init()
    };

    selector.prototype = {

        init: function () {
            var _this = this;
            document.addEventListener("DOMContentLoaded", function () {
                _this.mousedown();
                _this.mouseup();
            });
        },

        mousedown: function () {
            var _this = this;
            document.addEventListener("mousedown", function (e) {
                _this.xStart = e.clientX;
                _this.yStart = e.clientY;
            });
        },

        mouseup: function () {
            var _this = this;
            var matches;
            document.addEventListener("mouseup", function (e) {
                _this.xEnd = e.clientX;
                _this.yEnd = e.clientY;
                matches = _this.findMatches();
                console.log('all matches', matches);
            });
        },

        findMatches: function () {
            var all = document.querySelectorAll('div');
            var reduce = Array.prototype.forEach;
            var list = [];
            reduce.call(all, this.addMatches.bind(this, list));
            return list
        },

        addMatches: function (list, el) {
            if (this.isWithin(el))  {
                return list.push(el);
            }

            return list;
        },

        isWithin: function (el) {
            var top = parseInt(el.style.top, 10);
            var left = parseInt(el.style.left, 10);
            var right = left + parseInt(el.style.width, 10);
            var bottom = top + parseInt(el.style.height, 10);
            console.log('style', el.style);
            console.log('top bottom left righ', top, bottom, left, right);
            console.log('between', this.betweenY(top), this.betweenY(bottom), this.betweenX(left), this.betweenX(right));
            return this.betweenY(top) && this.betweenY(bottom) && this.betweenX(left) && this.betweenX(right);
        },

        betweenX: function (pos) {
            console.log('x', this.xStart, this.xEnd);
            return pos > this.xStart && this.xEnd > pos;
        },

        betweenY: function (pos) {
            console.log('y', this.yStart, this.yEnd);
            return pos > this.yStart && this.yEnd > pos;
        }

    };

    new selector();

}());