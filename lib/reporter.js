var chalk = require('chalk');
var reporter = {
  onSuccess: function(testName) {
    console.log(chalk.green('Success: ' + testName + ' passed'));
  },
  onError: function(err) {
    var failMessage = err.stack.split('\n')[0];
    var lineOfFail = err.stack.split('\n')[2].replace(' at', '');
    console.log(chalk.red(failMessage));
    console.log(lineOfFail);
  },
  onAsyncTimeout: function(testName) {
    console.log(chalk.red('Timeout error: async test ' + testName + ' did not complete in time.'));
  }
};

module.exports = reporter;
