import * as path from 'path';
import * as shellJs from 'shelljs';
import { kebabCase } from 's360-fundamental-toolkit';

import { PROJECT_CONFIG } from '../project.config';

// Use destructuring to get variables from PROJECT_CONFIG.
const { projectName: PROJECT_NAME } = PROJECT_CONFIG;

console.log('\n--------------------------------------------------');
console.log('Installing Waypoints.');

// --------------------------------------------------
// INSTALL waypoints

shellJs.exec('yarn add waypoints', { silent: true }, () => {
  // --------------------------------------------------
  // UPDATE THE theme.js FILE PLACEHOLDER

  shellJs.sed(
    '-i',
    /\/\*WAYPOINTS\*\//, [
      "require('waypoints/lib/jquery.waypoints.js');",
      "require('waypoints/lib/shortcuts/sticky.js');"
    ].join('\n'),
    path.resolve(`src/js/${ kebabCase(PROJECT_NAME) }.theme.js`)
  );

  console.log('\nInstallation Complete!');
  console.log('--------------------------------------------------\n');

  // --------------------------------------------------
  // REMOVE SETUP SCRIPTS

  shellJs.rm(path.resolve('config/installers/waypoints.*'));
  shellJs.sed('-i', /.*:waypoints.*/, '', path.resolve('package.json'));
});
