var _ = require('underscore');
var path = require('path');
var rybColorMixer = require('ryb-color-mixer');
var app = require('./app');

function Device(data) {
    if (!(this instanceof Device)) {
        return new Device(arguments);
    }
    _.extend(this, data);

    this.save = function(cb) {
        app.store.set(Device)(this.name, cb);
    };

    this.update = function(data, cb) {
        app.store.update(Device)(this.name, data, cb);
    };

    this.normalize = function(states, cb) {
        return cb(rybColorMixer.mix(states, {result: 'rgb'}));
    };

    return this;
}
Device.path = 'devices';

module.exports.get = Device.prototype.get = app.store.get(Device);
module.exports.on = Device.prototype.on = app.store.on(Device);
