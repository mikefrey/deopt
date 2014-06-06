deopt
=====

De-optionalize a call to a function or constructor


```js
// deopt a function:
var add = deopt(function(a, b) {
  return a + b
})
// then call it with an options hash
console.log('add', add({a:5, b:8}))



// It even work on "class" constructors when
// they begin with a capital letter.

function Thing(a, b) {
  this.a = a
  this.b = b
}

Thing.prototype.add = function() {
  return this.a + this.b
}

var Thang = deopt(Thing)

var thing = Thang({a:5, b:8, c:12, d:55})

console.log('add', thing.add())
console.log('is instance?', thing instanceof Thing)


// Provide a callback and do something with the result before
// returning it.

Thang = deopt(Thing, function(thing, opts) {
  thing.b += opts.c
  console.log('add', thing.add())
  return thing
})


Thang({a:5, b:8, c:12, d:55})

```
