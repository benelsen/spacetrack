var fs = require('fs');

var spacetrack = require('./src/spacetrack');

var common = {
  name: 'spacetrack',
  version: spacetrack.version,
  description: 'Simple node.js library for the Space-Track.org REST API.',
  keywords: [
    'spacetrack', 'JFCC', 'JSpOC', 'satellite', 'orbit'
  ],
  license: 'MIT'
};

var packagejson = {
  name: common.name,
  version: common.version,
  description: common.description,
  keywords: common.keywords,
  homepage: '',
  author: {
    name: 'Ben Elsen',
    url: 'http://benelsen.com'
  },
  repository: {
    type: 'git',
    url: 'https://github.com/benelsen/spacetrack.git'
  },
  dependencies: {
    'request': 'latest'
  },
  devDependencies: {
    'smash': 'latest',
    'uglify-js': 'latest',
    'jshint': 'latest',
    'mocha': 'latest',
    'complexity-report': 'latest',
    'should': 'latest'
  },
  main: 'src/spacetrack',
  scripts: {
    'test': 'make jshint complex test'
  },
  license: common.license
};

// var componentjson = {
//   name: common.name,
//   repo: 'benelsen/spacetrack',
//   description: common.description,
//   version: common.version,
//   keywords: common.keywords,
//   dependencies: {},
//   development: {},
//   scripts: [
//     'spacetrack.js'
//   ],
//   license: common.license
// };

fs.writeFile('package.json', JSON.stringify(packagejson, null, '  '), 'utf8');
// fs.writeFile('component.json', JSON.stringify(componentjson, null, '  '), 'utf8');
