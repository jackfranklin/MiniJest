var assert = require('assert');
var sinon = require('sinon');
var MiniJest = require('../index.js');

var testThing = new MiniJest.Base();
var beforeSpy = sinon.spy();
var afterSpy = sinon.spy();

testThing.reporter.onSuccess = function() {};

testThing.fn.someTest = function() {};
testThing.fn.someOtherTest = function() {};

describe('beforeEach', function() {
  it('runs once for each test', function() {
    testThing.fn.beforeEach = beforeSpy;
    testThing.run();
    assert.equal(2, beforeSpy.callCount);
  });
});

describe('afterEach', function() {
  it('runs once for each test', function() {
    testThing.fn.afterEach = afterSpy;
    testThing.run();
    assert.equal(2, afterSpy.callCount);
  });
});



