import * as path from 'path';

const PROJECT_CONFIG = {
  projectName: 's360-mediteran',
  pkg: require(path.resolve('package.json')),
  entryPoints: ['s360-mediteran.theme.js','s360-mediteran.fontawesome.js']
};

export { PROJECT_CONFIG };
