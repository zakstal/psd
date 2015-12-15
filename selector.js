(function () {
    'use strict';

    var selector = function () {
        this.init()
    };

    selector.prototype = {

        init: function () {
            this.body = document.getElementsByTagName('body')[0];
            this.draw = false;
            var _this = this;
            document.addEventListener("DOMContentLoaded", function () {
                _this.mousedown();
                _this.mousemove();
                _this.mouseup();
            });
        },

        mousemove: function () {
            var _this = this;
            document.addEventListener("mousemove", function (e) {
                console.log('mousemove');
                if (_this.draw) {
                    _this.changeSelectorEl({
                        xpos: e.clientX,
                        ypos: e.clientY
                    });
                }
            });
        },

        mousedown: function () {
            var _this = this;
            document.addEventListener("mousedown", function (e) {
                console.log('start X: ', e.clientX, ' start Y: ', e.clientY);
                _this.draw = true;
                _this.xStart = e.clientX;
                _this.yStart = e.clientY;
                _this.addSelectorEl({top: _this.yStart, left: _this.xStart})
            });
        },

        mouseup: function () {
            var _this = this;
            var matches;
            document.addEventListener("mouseup", function (e) {
                console.log('end X: ', e.clientX, ' end Y: ', e.clientY);
                _this.draw = false;
                _this.xEnd = e.clientX;
                _this.yEnd = e.clientY;
                matches = _this.findMatches();
                _this.removeSelectorEl();
                console.log('all matches', matches);
            });
        },

        addSelectorEl: function (options) {
            this.selectorEl = document.createElement('div');
            var style = this.selectorEl.style;
            style.border = '1px solid red';
            style.position = 'absolute';
            style.top = options.top;
            style.left = options.left;
            this.body.appendChild(this.selectorEl);
        },

        removeSelectorEl: function () {
            this.body.removeChild(this.selectorEl);
        },

        changeSelectorEl: function (options) {
            var width = Math.abs(this.xStart - options.xpos);
            var height = Math.abs(this.yStart - options.ypos);
            this.selectorEl.style.width = width;
            this.selectorEl.style.height = height;
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
            var top = parseInt(el.getAttribute('data-top'), 10);
            var left = parseInt(el.getAttribute('data-left'), 10);
            var right = left + parseInt(el.style.width, 10);
            var bottom = top + parseInt(el.style.height, 10);
            //console.log('attribute data top', el.getAttribute('data-top'));
            //console.log('top bottom left righ', top, bottom, left, right);
            //console.log('between', this.betweenY(top), this.betweenY(bottom), this.betweenX(left), this.betweenX(right));
            return this.betweenY(top) && this.betweenY(bottom) && this.betweenX(left) && this.betweenX(right);
        },

        betweenX: function (pos) {
            //console.log('x', this.xStart, this.xEnd);
            return pos > this.xStart && this.xEnd > pos;
        },

        betweenY: function (pos) {
            //console.log('y', this.yStart, this.yEnd);
            return pos > this.yStart && this.yEnd > pos;
        }

    };

    new selector();

}());