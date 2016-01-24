/**
 * Front end framework with similar function to backbone view
 * @param options
 */
module.exports = function (options) {
    'use strict';

    var init = function (moreOptions) {
        this.init(moreOptions);
        return this;
    };

    var Element = function () {};

    Element.prototype = {

        processOption: {
            events: 'processEvents'
        },

        init: function (options) {
            var el = options.el || false;
            this.assignEl(el);
            this.porcessOptions();
            if (this.initialize) {
                this.initialize(options);
            }
        },

        assignEl: function (el) {
            this.el = el || document.createElement('div');
        },

        porcessOptions: function (options) {
            var _this = this;
            Object.keys(this.processOption).forEach(function (opt) {
                if (_this[opt]) {
                    _this[_this.processOption[opt]]();
                }
            })
        },

        processEvents: function () {
            //TODO: add a each event to an array. and stop listening on all events before processing Events
            var events = this.events;
            var _this = this;
            Object.keys(events).forEach(function (event) {
                _this.createEvent(event, _this[events[event]]);
            });
        },

        createEvent: function (event, callback) {
            var eventObj = this.splitEventSelectors(event);
            var elAr = eventObj.selector ? this.el.querySelectorAll(eventObj.selector) : [this.el];
            this.each(elAr, this.addEvent.bind(this, eventObj.event, callback.bind(this)));
        },

        addEvent: function (event, callback, el) {
            el.addEventListener(event, function (e) {
                callback(e);
            });
        },

        splitEventSelectors: function (event) {
            var splitEvent = event.split(' ');
            var event = {};
            event.event = splitEvent.splice(0, 1)[0];
            event.selector = splitEvent.join(' ');
            return event;
        },

        each: function (iteratee, callback) {
            var each = Array.prototype.forEach;
            each.call(iteratee, callback);
        },

        reduce: function (iteratee, callback, thing) {
            var reduce = Array.prototype.reduce;
            return reduce.call(iteratee, callback, thing);
        },

        find: function (selector) {
            return this.el.querySelectorAll(selector);
        }
    };


    var create = function (funk, element) {
        var F = function () {};
        F.prototype = element.prototype;
        funk.prototype = new F();
        return funk;
    };


    var extend = function (obj, options) {
        Object.keys(options).forEach(function (key) {
            obj.prototype[key] = options[key];
        });

        return obj;
    };


    var createElement = function (options) {
        var newEl = create(init, Element);
        return extend(newEl, options);
    };

    return createElement(options);
};