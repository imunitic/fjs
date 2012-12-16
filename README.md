fjs
===

Functional JavaScript experiments

Examples:
----------

   var numbers = [1,2,3,4,5];
   Functional.map(numbers, function(n) { return n + n; }); // returns [2,4,6,8,10]

   var numbers = [1,7,2,3,5,4,10,9,20,13];
   Functional.collect(numbers, function(n) { return n < 8; }) // returns [1,7,2,3,5,4]
   

