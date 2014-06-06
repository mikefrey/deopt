(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory)
  } else if (typeof exports === 'object') {
    module.exports = factory()
  } else {
    root.deopt = factory()
  }
}(this, function () {

  return function deopt(fn, callback) {
    var keys = []
    var m = fn.toString().match(/^function(?:\s*)([^\(\s]*)(?:\s*)\(([^\)]*)\)/i)
    var argstr = m[2]
    var isConstructor = m[1] && (/^[A-Z]/).test(m[1])
    if (argstr && argstr.length) {
      keys = argstr.replace(/\s/g, '').split(',')
    }

    var apply
    if (isConstructor) {
      function F(args) { return fn.apply(this, args) }
      F.prototype = fn.prototype
      apply = function(args) { return new F(args) }
    } else {
      apply = function(args) { return fn.apply(null, args) }
    }

    return function(options) {
      var args = []
      for (var i = 0; i < keys.length; i+=1) {
        args.push(options[keys[i]])
      }
      if (typeof callback == 'function')
        return callback(apply(args), options)
      else
        return apply(args)
    }
  }

}))
