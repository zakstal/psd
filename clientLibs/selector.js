var Event = require('../libs/events');
/**
 * TODO:
 * make selector div able to go in reverse direction
 * adjust selector div for scroll
 * refactor addevenlitener out
 */

//(function () {
//    'use strict';

    var selector = function () {
        this.init()
    };

    selector.prototype = {

        init: function () {
            var _this = this;
            this.body = document.getElementsByTagName('body')[0];
            this.draw = false;
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
                _this.xStart = e.clientX + window.scrollX;
                _this.yStart = e.clientY + window.scrollY;
                _this.addSelectorEl({top: _this.yStart, left: _this.xStart})
            });
        },

        mouseup: function () {
            var _this = this;
            document.addEventListener("mouseup", function (e) {
                console.log('end X: ', e.clientX, ' end Y: ', e.clientY);
                _this.draw = false;
                _this.xEnd = e.clientX + window.scrollX;
                _this.yEnd = e.clientY + window.scrollY;
                _this.removeSelectorEl();
                _this.sendLoc();
            });
        },

        sendLoc: function () {

            this.trigger('complete', {
                X: [this.xStart, this.xEnd].sort(),
                Y: [this.yStart, this.yEnd].sort()
            });
        },

        addSelectorEl: function (options) {
            this.selectorEl = document.createElement('div');
            this.selectorEl.classList.add('selector-window');
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
            var width = this.xStart - (options.xpos + window.scrollX);
            var height = this.yStart - (options.ypos + window.scrollY);
            var transX = width > 0 ? (width * -1) : 0;
            var transY = height > 0 ? (height * -1) : 0;
            this.selectorEl.style.width = Math.abs(width);
            this.selectorEl.style.height = Math.abs(height);

            this.selectorEl.style.transform = 'translate(' + transX + 'px, ' + transY + 'px)';
        },

        on: function (trigger, callback) {
            this.events = this.events || new Event();
            this.events.on(trigger, callback);
        },

        trigger: function (trigger, opt) {
            this.events.trigger(trigger, opt);
        }

    };

    module.exports = new selector();

//}());