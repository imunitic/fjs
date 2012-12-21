// Functional tests
module('Functional tests');
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

test('any: test if any of the elements in the list satisfy the predicate', function() {
	var list = [1,2,3,4];	
	equal(true, Functional.any(list, function(n) { return n > 2; }));
});

test('all: test if all elements in the list satisfy the predicate', function() {
	var list = [1,2,3,4];	
	equal(false, Functional.all(list, function(n) { return n > 2; }));
});

// Lenses tests
module('Lenses tests');
test('attr: creates a lens for a property', function() {
	var person = {
		firstName: 'John',
		lastName: 'Doe'
	};
	
	var firstNameL = Lenses.attr('firstName');
	equal('John', firstNameL.get(person));
	deepEqual({firstName: 'Jane', lastName: 'Doe'}, firstNameL.set(person, 'Jane'));
});

test('compose: composes two lenses to create a new lens', function() {
	var person = {
		firstName: 'John',
		lastName: 'Doe',
		address: {
			street: 'Elm',
			number: 22
		}
	};
	
	var addressL = Lenses.attr('address');
	var streetL = Lenses.attr('street');
	var personStreet = Lenses.compose(addressL, streetL);	
	equal('Elm', personStreet.get(person));
	
	var expected = {
		firstName: 'John',
		lastName: 'Doe',
		address: {
			street: 'Oak',
			number: 22
		}
	};	
	deepEqual(expected, personStreet.set(person, 'Oak'));
});

test('fold: folds over a collection of lenses to create a new lens', function() {
	var person = {
		firstName: 'John',
		lastName: 'Doe',
		address: {
			street: 'Elm',
			number: 22
		}
	};
	
	var addressL = Lenses.attr('address');
	var streetL = Lenses.attr('street');
	var personStreet = Lenses.fold([addressL, streetL]);	
	equal('Elm', personStreet.get(person));
	
	var expected = {
		firstName: 'John',
		lastName: 'Doe',
		address: {
			street: 'Oak',
			number: 22
		}
	};	
	deepEqual(expected, personStreet.set(person, 'Oak'));
});

test("modify: applies a function to a property which is then set by a lens", function() {
	var person = {
		firstName: 'John',
		lastName: 'Doe',
		address: {
			street: 'Elm',
			number: 22
		}
	};
	
	var personStreetL = Lenses.compose(Lenses.attr('address'), Lenses.attr('street'));	
	var setPersonStreet = Lenses.modify(personStreetL, function(street) { return "changed " + street });
	var expected = {
		firstName: 'John',
		lastName: 'Doe',
		address: {
			street: 'changed Elm',
			number: 22
		}
	};	
	deepEqual(expected, setPersonStreet(person));
	notDeepEqual(person, expected);
	
});

