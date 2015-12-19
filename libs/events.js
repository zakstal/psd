var Events = function () {};

Events.prototype = {
    on: function (trigger, callback) {
        this.events = this.events || {};
        this.events[trigger] =  this.events[trigger] ?  this.events[trigger].push(callback) : [callback];
    },

    trigger: function (trigger, opt) {
        var events = this.events || {};
        var event = events[trigger] || [];
        if (event.length) {
            event.forEach(function (callback) {
                callback(opt);
            });
        }
    }
};

module.exports = Events;