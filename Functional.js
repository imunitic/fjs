(function () {
    var _ = {};
    _.uniquify = function (sequence, f) {
        if (typeof (f) == 'undefined') f = function (e1, e2) { return e1 == e2; };
        var seq = [];
        for (var i = 0; i < sequence.length; ++i) {
            if (_.findIndex(seq, function (e) { return f(e, sequence[i]); }) === -1) seq.push(sequence[i]);
        }
        return seq;
    };
    _.nub = _.uniquify;

    _.collect = function (sequence, fn) {
        var seq = [];
        for (var i = 0, sl = sequence.length; i < sl; ++i) {
            if (fn(sequence[i]) === true) {
                seq.push(sequence[i]);
            }
        }
        return seq;
    };
    _.filter = function (sequence, fn) {
        var seq = [];
        for (var i = 0, sl = sequence.length; i < sl; ++i) {
            if (fn(sequence[i]) === false) {
                seq.push(sequence[i]);
            }
        }
        return seq;
    };

    _.take = function (sequence, n) {
        return sequence.slice(0).splice(0, n);
    };
    _.takeWhile = function (sequence, fn) {
        var seq = [];
        for (var i = 0, sl = sequence.length; i < sl; ++i) {
            if (fn(sequence[i]) === false) break;
            seq.push(sequence[i]);
        }

        return seq.length > 0 ? seq : sequence;
    };
    _.dropWhile = function (sequence, fn) {
        for (var i = 0, sl = sequence.length; i < sl; ++i) {
            if (fn(sequence[i]) === false) return sequence.slice(i);
            else continue;
        }

        return [];
    };

    _.map = function (sequence, fn) {
        var seq = [];
        for (var i = 0, sl = sequence.length; i < sl; ++i) {
            seq.push(fn(sequence[i]));
        }
        return seq;
    };

    _.reduce = function (sequence, init, fn) {
        var result = init;
        for (var i = 0, sl = sequence.length; i < sl; ++i) {
            result = fn(result, sequence[i]);
        }
        return result;
    };
    _.foldLeft = _.reduce;
    _.foldRight = function (sequence, init, fn) {
        return _.foldLeft(sequence.reverse(), init, fn);
    };

    _.sort = function (sequence, fn) {
        return sequence.sort(fn);
    };

    _.findIndex = function (sequence, fn) {
        for (var i = 0, sl = sequence.length; i < sl; ++i) {
            if (fn(sequence[i])) return i;
        }

        return -1;
    };
    _.findIndices = function (sequence, fn) {
        var seq = [];
        for (var i = 0, sl = sequence.length; i < sl; ++i) {
            if (fn(sequence[i])) seq.push(i);
        }
        return seq;
    };

    _.head = function (sequence) {
        return sequence.slice(0).splice(0, 1)[0];
    };
    _.tail = function (sequence) {
        return sequence.slice(1);
    };

    _.intersect = function (seq1, seq2, fn) {
        if (typeof (fn) == "undefined")
            fn = function (i) { return seq2.indexOf(i) != -1 ? true : false; };
        return _.collect(seq1, fn);
    };

    _.partialyLeft = function (fn) {
        var args = Array.prototype.slice.call(arguments, 1);
        return function () {
            var ar = args.concat(Array.prototype.slice.call(arguments))
            return fn.apply(null, ar);
        };
    };
    _.partialyRight = function (fn) {
        var args = Array.prototype.slice.call(arguments, 1);
        return function () {
            var ar = Array.prototype.slice.call(arguments).concat(args);
            return fn.apply(null, ar);
        };
    };

    _.splat = function (fn) {
        return function (seq) {
            return _.map(seq, fn);
        };
    };

    _.get = function (attr) {
        return function (object) { return object[attr]; };
    };

    _.set = function (attr, copy) {
        if (typeof (copy) == 'undefined') copy = _.jsonCopy;
        return function (object, value) {
            var o = copy(object);
            o[attr] = value;
            return o;
        };
    };

    _.newLens = function (attr, copy) {
        return {
            attr: attr,
            get: _.get(attr),
            set: _.set(attr, copy)
        };
    };

    _.composeLens = function (self, that) {
        return {
            attr: self.attr + " > " + that.attr,
            get: function (obj) {
                return that.get(self.get(obj));
            },
            set: function (obj, value) {
                return self.set(obj, that.set(self.get(obj), value))
            }
        };
    };

    _.foldLens = function (seq) {
        var identity = {
            attr: "",
            get: function (obj) { return obj; },
            set: function (obj, value) { return value; }
        };
        return _.foldLeft(seq, identity, _.partialyLeft(_.composeLens));
    }

    _.clone = (function () {
        function Clone() { }
        return function (obj) {
            Clone.prototype = obj;
            return new Clone();
        };
    })();

    _.jsonCopy = function (obj) {
        return JSON.parse(JSON.stringify(obj));
    };


    _.pluck = function (attr) {
        return splat(get(attr));
    };

    this.Functional = _;
})();