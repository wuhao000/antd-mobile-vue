/**
 * Build npm lib
 */
const shell = require('shelljs');
const signale = require('signale');

const { Signale } = signale;
const tasks = [
  // 'npm run bootstrap',
  // 'npm run lint',
  // 'npm run build:entry',
  'node compile/build-components.js',
  'node compile/build-style.js',
  'node compile/build-style-entry.js',
  'cross-env NODE_ENV=production webpack --color --config build/webpack.pkg.js',
  'cross-env NODE_ENV=production webpack -p --color --config build/webpack.pkg.js'
];

tasks.forEach(task => {
  signale.start(task);

  const interactive = new Signale({ interactive: true });
  interactive.pending(task);
  const result = shell.exec(`${task} --silent`);
  if (result.code !== 0) {
    interactive.error(task);
  } else {
    interactive.success(task);
  }
});
