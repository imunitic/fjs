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

- filter
- sort
- findIndex
- findIndices
- nub/uniquify
- take
- takeWhile
- dropWhile
- head
- tail
- intersect
- partial
- partialRight

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
    

