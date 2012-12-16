fjs
===

Functional JavaScript experiments
All functions return a new object when making changes


Examples:
~~~~~~~~~~

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
   

