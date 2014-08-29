traceurepl
==========

Traceur repl. Type es6 script then show compiled script and result.


Example
-----

```
bin/traceurepl

T>let one = 1
var one = 1;

T>let [ one, ...other ] = [ 1, 2, 3, 4 ]
var $__0 = [1, 2, 3, 4],
    one = $__0[0],
    other = Array.prototype.slice.call($__0, 1);
T>one
one;
1
T>other
other;
[ 2, 3, 4 ]

T>let fun = a => a * a
var fun = (function(a) {
  return a * a;
});
T>fun(3)
fun(3);
9

T>import path from 'path'
var $__path__;
var path = ($__path__ = require("path"), $__path__ && $__path__.__esModule && $__path__ || {default: $__path__}).default;
T>path.sep
path.sep;
'/'

T>console.time('promise')
console.time('promise');
T>new Promise( resolve => setTimeout( () => resolve(), 1000)).then( () => console.timeEnd('promise'))
new Promise((function(resolve) {
  return setTimeout((function() {
    return resolve();
  }), 1000);
})).then((function() {
  return console.timeEnd('promise');
}));
{ status_: 0,
  value_: undefined,
  onResolve_: [],
  onReject_: [] }
T>promise: 3633ms

T>let asyncFunc = async () => await new Promise( (resolve, reject) => setTimeout( () => resolve(), 1000))
var asyncFunc = (function() {
  var $__0,
      $__1,
      $__2,
      $__3,
      $__4,
      $__5;
  return $traceurRuntime.asyncWrap(function($ctx) {
    while (true)
      switch ($ctx.state) {
        case 0:
          $__3 = function(resolve, reject) {
            return $__1 = function() {
              return $__0 = resolve(), $__0;
            }, $__2 = setTimeout($__1, 1000), $__2;
          };
          $__4 = new Promise($__3);
          $ctx.state = 5;
          break;
        case 5:
          Promise.resolve($__4).then($ctx.createCallback(2), $ctx.errback);
          return;
        case 2:
          $__5 = $ctx.value;
          $ctx.state = 3;
          break;
        case 3:
          $ctx.returnValue = $__5;
          $ctx.state = 7;
          break;
        case 7:
          $ctx.state = -2;
          break;
        default:
          return $ctx.end();
      }
  }, this);
});
T>
```