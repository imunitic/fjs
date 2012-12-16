test('uniquify: returns a list of unique values' , function() {
	deepEqual([1,2,3], Functional.uniquify([1,2,2,3,3,3]));
});

test('nub: is just an alias to uniquify', function() {
	deepEqual(Functional.nub([1,2,2,3,3,3]), Functional.uniquify([1,2,2,3,3,3]));
});

test('collect: elements that satisfy a predicate', function() {
	deepEqual([2,4,6], Functional.collect([1,2,3,4,5,6], function(n) { return n % 2 == 0; }));
});

test('filter: removes elements that satisfy a predicate', function() {
	deepEqual([1,3,5], Functional.filter([1,2,3,4,5,6], function(n) { return n % 2 == 0; }));
});

test('take: take first n elements from a list', function() {
	deepEqual([1,2,3], Functional.take([1,2,3,4,5,6], 3));
});

test('takeWhile: take elements while a predicate is true', function() {
	deepEqual([1,2,3,4,5], Functional.takeWhile([1,2,3,4,5,6,7,8,9, 10], function(n) { return n < 6; }));
	deepEqual([1,2,3], Functional.takeWhile([1,2,3,7, 4,5,6,7,8,9, 10], function(n) { return n < 6; }));
});

test('dropWhile: drop elements while a predicate is true', function() {
	deepEqual([6,7,8,9,10], Functional.dropWhile([1,2,3,4,5,6,7,8,9, 10], function(n) { return n < 6; }));
	deepEqual([7,4,5,6,7,8,9,10], Functional.dropWhile([1,2,3,7,4,5,6,7,8,9, 10], function(n) { return n < 6; }));
});

test('map: map over a list and execute a function on every element returning a new list', function() {
	var list = [1,2,3,4];
	var expected = [1,4,9,16];
	
	deepEqual(expected, Functional.map(list, function(n) { return n * n; }));
	deepEqual([1,2,3,4], list);
});


