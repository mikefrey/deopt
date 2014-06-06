var deopt = require('./deopt')
var assert = require('assert')

// deopt a function:
var add = deopt(function(a, b) {
  return a + b
})
// then call it with an options hash
assert.equal(add({a:5, b:8}), 13)



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

assert.equal(thing.add(), 13)
assert(thing instanceof Thing)


// Provide a callback and do something with the result before
// returning it.

Thang = deopt(Thing, function(thing, opts) {
  thing.b += opts.c
  assert.equal(thing.add(), 25)
  return thing
})


Thang({a:5, b:8, c:12, d:55})

console.log('All tests pass')
