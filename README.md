fjs
===

Functional JavaScript experiments
All functions return a new object when making changes


Functional:

Implements functions that work over lists and a simple implementation of partial function application.


    var numbers = [1,2,3,4,5];
    Functional.map(numbers, function(n) { return n + n; }); // returns [2,4,6,8,10]

    var numbers = [1,7,2,3,5,4,10,9,20,13];
    Functional.collect(numbers, function(n) { return n < 8; }) // returns [1,7,2,3,5,4]

    var numbers = [1,2,3,4,5,6,7,8,9,10];
    Functional.foldLeft([1,2,3,4,5,6,7,8,9,10], 0, function(acc, next) { return acc + next; }) // returns 55
    Functional.foldRight([1,2,3,4,5,6,7,8,9,10], 0, function(acc, next) { return acc + next; }) // returns 55


Other functions in the Functional namespace are:

- **filter** - remove elements that satisfy a predicate
- **sort** - sort a list by a function
- **findIndex** - find the index of a value using a predicate
- **findIndices** - find all indexes of a value using a predicate
- **nub** / **uniquify** - remove duplicates
- **take** - take first n elements
- **takeWhile** - take elements while a condition is true
- **dropWhile** - drop elements while a condition is true
- **head** - returns the head of a list
- **tail** - returns the tails of a list
- **intersect** - returns an intersect of two lists
- **partial** - partialy apply a function (apply arguments from left)
- **partialRight** - partialy apply a function (apply arguments from right)

Lenses:

Implements simple asymmetric lenses inspired by the [Asymmetric Lenses in Scala](http://dl.dropbox.com/u/7810909/media/doc/lenses.pdf) paper written by Tony Morris
   
    var person = { firstName: "John", lastName: "Doe", address: { street: "Elm", number: 22 }};
    var firstNameL = Lenses.attr('firstName'); // creates a lens for the firstName property;
    var firstNameLCustom = Lenses.new(function(obj) { return obj.firstName; }, function(obj, value) { obj.firstName = value; }); // Creates a custom lens
    firstNameL.get(person); // returns John
    firstNameL.set(person, 'Jane') // returns a new object { firstName: "Jane", lastName: "Doe", address: { street: "Elm", number: 22 }};

    // We can compose lenses
    var addressL = Lenses.attr('address');
    var streetL = Lenses.attr('street');
    var personStreetL = Lenses.compose(addressL, streetL);
    personStreetL.get(person) // returns Elm
    personStreetL.set(person, 'Oak') // returns a new object { firstName: "John", lastName: "Doe", address: { street: "Oak", number: 22 }};


Other functions in the Lenses namespace are:

- **fold** - folds over a list of lenses resulting in a new lens
- **modify** - given a lens and a function applies that function on the property and sets the result 
- **id** - returns an identity lens
    

## NOTE

Lenses uses an internal copy function that attaches to the Object prototype if the function does not exists. The function uses a simple JSON.parse(JSON.stringify(obj)) to copy an object. This does not copy functions on the object. If that is a problem for you you can provide your own implementation by overriding Object.prototype.copy

I'm open for better suggestions as I'm in no way a JavaScript expert.
