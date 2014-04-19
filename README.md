# MiniJest

A Node testing framework inspired by MiniTest for Ruby.

I like the idea of making tests methods on an object. I find it acts as a nice natural divider to make sure each test file isn't doing too much.

## Example

```js
var MiniJest = require('./index.js');

var testMyThing = new MiniJest.Base();

// all tests are added to the fn object
testMyThing.fn.testTwoPlusTwoEqualsFour = function() {
  this.assertEqual(2 + 3, 4);
};

// nothing happens without this line!
testMyThing.run();
```

To run your tests, just execute them through Node:

```
$ node myTest.js
```

## Customising the Reporter
You can change the reporter like so:

```js
var MiniJest = require('./index.js');

var testMyThing = new MiniJest.Base();

testMyThing.reporter.onSuccess = function(testName) {
    // called when test passes
};

testMyThing.reporter.onError = function(err) {
    // called when test fails
};

testMyThing.reporter.onAsyncTimeout = function(testName) {
    // called when an async test times out
};

testMyThing.run();
```

## Adding Matchers

```js
var MiniJest = require('./index.js');

var testMyThing = new MiniJest.Base();

// a new matcher that always fails
// matchers added to the matchers object
// a failed matcher is expected to throw an error
testMyThing.matchers.alwaysFailsAssertion = function() {
    throw new Error('test failed');
};

testMyThing.fn.testCustomMatcher = function() {
    this.alwaysFailsAssertion();
};

testMyThing.run();
```

## Handling Async

MiniJest handles async a little differently. An async test takes a callback, but you pass that callback a function in which you make your assertions:

```js
testMyThing.fn.asyncTest = function(done) {
  setTimeout(function() {
    var res = 5;
    done(function() {
      this.assertEqual(res, 5);
    });
  }, 500);
};
```

This seems a little odd but is actually quite a nice way of doing things in practice.

