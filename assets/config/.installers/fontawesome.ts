import * as path from 'path';
import * as shellJs from 'shelljs';

import BUILD_CONFIG from '../build.config';

console.log('\n--------------------------------------------------');
console.log('Installing Font Awesome Pro.');

// --------------------------------------------------
// GET THE *.theme.scss FILE
// --------------------------------------------------

const THEME_SCSS_FILE: string = BUILD_CONFIG.getThemeFile('scss');

// --------------------------------------------------
// INSTALL Font Awesome Pro
// --------------------------------------------------

shellJs.exec('yarn add @fortawesome/fontawesome-pro', { silent: true }, (code) => {
  // --------------------------------------------------
  // UPDATE THE *.theme.scss FILE PLACEHOLDER
  // --------------------------------------------------
  if (code == 0) {
    shellJs.sed(
      '-i',
      /\/\*FONT_AWESOME\*\//, [
        '$fa-font-path: "~@fortawesome/fontawesome-pro/webfonts" !default;',
        '@import "~@fortawesome/fontawesome-pro/scss/fontawesome";',
        '// @import "~@fortawesome/fontawesome-pro/scss/light";',
        '// @import "~@fortawesome/fontawesome-pro/scss/regular";',
        '// @import "~@fortawesome/fontawesome-pro/scss/solid";',
        '// @import "~@fortawesome/fontawesome-pro/scss/brands";'
      ].join('\n'),
      path.resolve(`src/scss/${ THEME_SCSS_FILE }`)
    );

    console.log('\nInstallation Complete!');
    console.log('--------------------------------------------------\n');

    // --------------------------------------------------
    // REMOVE SETUP SCRIPTS
    // --------------------------------------------------

    shellJs.rm(path.resolve('config/.installers/fontawesome.*'));

    shellJs.sed(
      '-i',
      /.*:fontawesome.*/, '',
      path.resolve('package.json')
    );
  }

  // There was a problem.
  else {
    console.log('\nMissing or invalid Pro npm Package Token.');
    console.log('\nInstallation Failed!');
    console.log('--------------------------------------------------\n');

    return false;
  }
});