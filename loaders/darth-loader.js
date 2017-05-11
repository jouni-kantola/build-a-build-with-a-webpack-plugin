const chalk = require('chalk');

module.exports = input => {
  console.log(chalk.green.underline.bold(`
Incoming to darth-loader: ${input}
  `));

  const output = input.replace(
    /return ".*?"/,
    `return "Luke, I am Your Father"`
  );

  console.log(chalk.red.underline.bold(`
Outgoing from darth-loader: ${output}
  `))

  return output;
};
