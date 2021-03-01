import * as path from 'path';
import * as shellJs from 'shelljs';
import * as readlineSync from 'readline-sync';
import { kebabCase } from 's360-fundamental-toolkit';

import {PROJECT_CONFIG} from '../project.config';

// Use destructuring to get variables from PROJECT_CONFIG.
const { projectName: PROJECT_NAME } = PROJECT_CONFIG;

console.log('\n--------------------------------------------------');
console.log('Which slider library do you want to install?');

// --------------------------------------------------
// DEFINE THE AVAILABLE SLIDER LIBRARIES

const SLIDER_LIBRARIES: any[] = [
  {
    'name': 'bxSlider',
    'package': 'bxslider',
    'js': 'require(\'bxslider/dist/jquery.bxslider.js\');',
    'css': '@import "~bxslider/dist/jquery.bxslider.css";'
  },
  {
    'name': 'OWL Carousel 2',
    'package': 'owl.carousel',
    'js': 'require(\'owl.carousel/dist/owl.carousel.js\');',
    'css': '@import "~owl.carousel/dist/assets/owl.carousel.css";'
  },
  {
    'name': 'FlexSlider',
    'package': 'flexslider',
    'js': 'require(\'flexslider/jquery.flexslider.js\');',
    'css': '@import "~flexslider/flexslider.css";'
  },
  {
    'name': 'Slick Carousel',
    'package': 'slick-carousel',
    'js': 'require(\'slick-carousel/slick/slick.js\');',
    'css': '@import "~slick-carousel/slick/slick.scss";'
  }
];

// --------------------------------------------------
// ASK THE USER FOR THEIR INPUT

const SLIDER_LIBRARY_INDEX: number = readlineSync.keyInSelect(
  SLIDER_LIBRARIES.map(sliderLibrary => sliderLibrary['name']),
  'Enter a number: '
);

if (SLIDER_LIBRARY_INDEX !== -1) {
  console.log(`\nInstalling ${ SLIDER_LIBRARIES[SLIDER_LIBRARY_INDEX].name }`);

  // --------------------------------------------------
  // INSTALL THE SELECTED SLIDER LIBRARY

  shellJs.exec(`yarn add ${ SLIDER_LIBRARIES[SLIDER_LIBRARY_INDEX].package }`, { silent: true }, () => {
    // --------------------------------------------------
    // UPDATE THE *.theme.js/.scss FILE PLACEHOLDERS

    shellJs.sed(
      '-i',
      /\/\*SLIDER\*\//, SLIDER_LIBRARIES[SLIDER_LIBRARY_INDEX].js,
      path.resolve(`src/js/${ kebabCase(PROJECT_NAME) }.theme.js`)
    );

    shellJs.sed(
      '-i',
      /\/\*SLIDER\*\//, SLIDER_LIBRARIES[SLIDER_LIBRARY_INDEX].css,
      path.resolve(`src/scss/${ kebabCase(PROJECT_NAME) }.theme.scss`)
    );


    console.log('\nInstallation complete!');
    console.log('--------------------------------------------------\n');

    // --------------------------------------------------
    // REMOVE SETUP SCRIPTS

    shellJs.rm(path.resolve('config/installers/slider.*'));
    shellJs.sed('-i', /.*:slider.*/, '', path.resolve('package.json'));
  });
}

else {
  console.log('\nInstallation cancelled!');
  console.log('--------------------------------------------------\n');
}
