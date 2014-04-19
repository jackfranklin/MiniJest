var assert = require('assert');
var matchers = require('../lib/matchers.js');

describe('matchers', function() {
  describe('assertEqual', function() {
    it('does not throw when passing', function() {
      assert.doesNotThrow(function() {
        matchers.assertEqual(2, 2);
        matchers.assertEqual(2, '2');
      });
    });

    it('throws when given fails', function() {
      assert.throws(function() {
        matchers.assertEqual(1, 2);
      });
    });
  });

  describe('assert', function() {
    it('does not throw when expected', function() {
      assert.doesNotThrow(function() {
        matchers.assert(true);
        matchers.assert(1);
        matchers.assert([]);
      });
    });

    it('throws when expected', function() {
      assert.throws(function() {
        matchers.assert(false);
      });
      assert.throws(function() {
        matchers.assert(0);
      });
    });
  });

  describe('assertThrows', function() {
    it('does not throw when expected', function() {
      assert.doesNotThrow(function() {
        matchers.assertThrows(function() {
          throw new Error();
        });
      });
    });

    it('throws when expected', function() {
      assert.throws(function() {
        matchers.assertThrows(function() {});
      });
    });
  });
});

