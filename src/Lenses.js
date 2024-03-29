﻿(function () {
    var _ = {};

    _.new = function (get, set) {
        var setF = function (obj, value) {
            var clone = obj.copy();
            set(clone, value);
            return clone;
        };
        return new Lens(get, setF);
    };

    _.attr = function (attr) {
        return new Lens(
          function (obj) { return obj[attr]; },
          function (obj, value) {
              var clone = obj.copy();
              clone[attr] = value;
              return clone;
          }
        );
    };

    _.id = function () {
        return new Lens(
            function (obj) { return obj; },
            function (obj, value) { return value; }
        );
    };

    _.compose = function (self, that) {
        return new Lens(
            function (obj) { return that.get(self.get(obj)); },
            function (obj, value) { return self.set(obj, that.set(self.get(obj), value)); }
        );
    };

    _.fold = function (seq) {
        return Functional.foldLeft(seq, _.id(), Functional.partial(_.compose));
    };
	
	_.modify = function(l, f) {
		return function(obj) {
			return l.set(obj, f(l.get(obj)));
		}
	};


    this.Lenses = _;

    // Set copy function if there is no one available
    if (typeof (Object.prototype.copy) == 'undefined') {
        Object.prototype.copy = function () {
            return JSON.parse(JSON.stringify(this));
        };
    }

    // private members
    function Lens(get, set) {
        if (typeof (get) != 'function') throw "get must  be a function";
        if (typeof (set) != 'function') throw "get must  be a function";

        this.get = get;
        this.set = set;
    }
})()