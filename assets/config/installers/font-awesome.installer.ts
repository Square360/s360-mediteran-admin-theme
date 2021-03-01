import * as path from 'path';
import * as shellJs from 'shelljs';
import * as fs from 'fs';
import { kebabCase } from 's360-fundamental-toolkit';

import { PROJECT_CONFIG } from '../project.config';

// Use destructuring to get variables from PROJECT_CONFIG.
const { projectName: PROJECT_NAME } = PROJECT_CONFIG;

console.log('\n--------------------------------------------------');
console.log('Installing Font Awesome Pro.');

// --------------------------------------------------
// INSTALL Font Awesome Pro

shellJs.exec('yarn add @fortawesome/fontawesome-pro', { silent: true }, (code: number) => {
  // --------------------------------------------------
  // CREATE fontawesome ENTRY FILE

  if (code == 0) {
    shellJs.exec(
      'yarn setup:entrypoint --name fontawesome  --skipEntryPointCheck --ignore-scripts',
      { silent: true },
      (code: number) => {
        fs.appendFile(
          path.resolve(`src/scss/${ kebabCase(PROJECT_NAME) }.fontawesome.scss`),
          [
            '$fa-font-path: "~@fortawesome/fontawesome-pro/webfonts" !default;',
            '@import "~@fortawesome/fontawesome-pro/scss/fontawesome";',
            '// @import "~@fortawesome/fontawesome-pro/scss/light";',
            '// @import "~@fortawesome/fontawesome-pro/scss/regular";',
            '// @import "~@fortawesome/fontawesome-pro/scss/solid";',
            '// @import "~@fortawesome/fontawesome-pro/scss/brands";'
          ].join('\n'),
          (err: any) => {
            if (err) {
              process.exit();
            }
          }
        );

        console.log('\nInstallation Complete!');
        console.log('--------------------------------------------------\n');

        // --------------------------------------------------
        // REMOVE SETUP SCRIPTS

        shellJs.rm(path.resolve('config/installers/fontawesome.*'));
        shellJs.sed('-i', /.*:fontawesome.*/, '', path.resolve('package.json'));
      }
    );
  }

  // Issue installing fontawesome lib.
  else {
    console.log('\nMissing or invalid Font Awesome "Pro npm Package Token".');
    console.log('\nInstallation Failed!');
    console.log('--------------------------------------------------\n');

    process.exit();
  }
});
