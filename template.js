/*
 * grunt-init-gruntfile
 * https://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Create a basic Gruntfile.';
// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({}, [
     init.prompt('name'),
     init.prompt('title'),
     init.prompt('version'),
     init.prompt('description'),
     init.prompt('main','index.js'),
     init.prompt('author'),
     init.prompt('license','SIC'),
    // Prompt for these values.
    {
      name: 'dom',
      message: 'Is the DOM involved in ANY way?',
      default: 'Y/n',
      warning: 'Yes: QUnit unit tests + JSHint "browser" globals. No: Nodeunit unit tests.'
    },
    {
      name: 'min_concat',
      message: 'Will files be concatenated or minified?',
      default: 'Y/n',
      warning: 'Yes: min + concat tasks. No: nothing to see here.'
    },
    {
      name: 'package_json',
      message: 'Will you have a package.json file?',
      default: 'Y/n',
      warning: 'This changes how filenames are determined and banners are generated.'
    }
  ], function(err, props) {
    props.bower = /y/i.test(props.bower);
    props.package_json = /y/i.test(props.package_json);
    props.test_task = props.dom ? 'qunit' : 'nodeunit';
    props.file_name = props.package_json ? '<%= pkg.name %>' : 'FILE_NAME';


      function prefer(arr, preferred) {
        for (var i = 0; i < preferred.length; i++) {
          if (arr.indexOf(preferred[i]) !== -1) {
            return preferred[i];
          }
        }
        return preferred[0];
      }

    // Guess at some directories, if they exist.
    var dirs = grunt.file.expand({filter: 'isDirectory'}, '*').map(function(d) { return d.slice(0, -1); });
    props.lib_dir = prefer(dirs, ['lib', 'src']);
    props.test_dir = prefer(dirs, ['test', 'tests', 'unit', 'spec']);
    props.jquery = grunt.file.expand({filter: 'isFile'}, '**/jquery*.js').length > 0;
    // 
    var files = init.filesToCopy(props);
    init.copyAndProcess(files, props);
    // If is package_json true, generate package.json
    if (props.package_json) {
          // Generate package.json file, used by npm and grunt.
          init.writePackageJSON('package.json', {
             name: props.name,
             title: props.title,
             version: props.version,
             description: props.description,
             main: props.main,
             scripts:{
                    test: grunt qunit
                  },
             author: props.author,
             license: props.license,
             devDependencies: {
                  "grunt": "~0.4.5",
                  "grunt-contrib-clean": "^0.6.0",
                  "grunt-contrib-concat": "~0.4.0",
                  "grunt-contrib-copy": "^0.8.2",
                  "grunt-contrib-cssmin": "^0.14.0",
                  "grunt-contrib-jshint": "~0.10.0",
                  "grunt-contrib-nodeunit": "~0.4.1",
                  "grunt-contrib-qunit": "~0.5.2",
                  "grunt-contrib-sass": "^0.9.2",
                  "grunt-contrib-uglify": "~0.5.0",
                  "grunt-contrib-watch": "~0.6.1"
                  }
          });
    }

    // All done!
    done();
  });

};
