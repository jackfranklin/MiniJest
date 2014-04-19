var assert = require('assert');

var sinon = require('sinon');

var MiniJest = require('../index.js');

var testThing = new MiniJest.Base();

var beforeSpy = sinon.spy();
var afterSpy = sinon.spy();

testThing.fn.beforeAll = beforeSpy;
testThing.fn.afterAll = afterSpy;

describe('beforeAll', function() {
  it('runs', function() {
    testThing.run();
    assert(beforeSpy.called);
  });
});

describe('afterAll', function() {
  it('runs', function() {
    testThing.run();
    assert(afterSpy.called);
  });
});


