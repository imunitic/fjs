(function () {
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
        return foldLeft(seq, _.id(), partial(_.compose));
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
    function foldLeft(sequence, init, fn) {
        var result = init;
        for (var i = 0, sl = sequence.length; i < sl; ++i) {
            result = fn(result, sequence[i]);
        }
        return result;
    }
    function partial(fn) {
        var args = Array.prototype.slice.call(arguments, 1);
        return function () {
            var ar = args.concat(Array.prototype.slice.call(arguments))
            return fn.apply(null, ar);
        };
    }
    function jsonCopy(obj) { return JSON.parse(JSON.stringify(obj)); }
})()