import * as path from 'path';
import * as shellJs from 'shelljs';

import BUILD_CONFIG from '../build.config';

console.log('\n--------------------------------------------------');
console.log('Installing Waypoints.');

// --------------------------------------------------
// GET THE *.theme.js FILE
// --------------------------------------------------

const THEME_JS_FILE: string = BUILD_CONFIG.getThemeFile('js');

// --------------------------------------------------
// INSTALL waypoints
// --------------------------------------------------

shellJs.exec('yarn add waypoints', { silent: true }, () => {
  // --------------------------------------------------
  // UPDATE THE *.theme.js FILE PLACEHOLDER
  // --------------------------------------------------

  shellJs.sed(
    '-i',
    /\/\*WAYPOINTS\*\//, [
      "require('waypoints/lib/jquery.waypoints.js');",
      "require('waypoints/lib/shortcuts/sticky.js');"
    ].join('\n'),
    path.resolve(`src/js/${ THEME_JS_FILE }`)
  );

  console.log('\nInstallation Complete!');
  console.log('--------------------------------------------------\n');

  // --------------------------------------------------
  // REMOVE SETUP SCRIPTS
  // --------------------------------------------------

  shellJs.rm(path.resolve('config/.installers/waypoints.*'));

  shellJs.sed(
    '-i',
    /.*:waypoints.*/, '',
    path.resolve('package.json')
  );
});