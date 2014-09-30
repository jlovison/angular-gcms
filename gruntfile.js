module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ["dist"],
    ngAnnotate: {
      build: {
        src: ['angular-gcms.js'],
        dest: 'dist/angular-gcms.min.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: [{
          src: 'dist/angular-gcms.min.js',
          dest: 'dist/angular-gcms.min.js'
        }]
      }
    },
    jshint: {
      files: ['gruntfile.js' /*, 'app/js/*.js' */ ],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }

    },
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        background: true
      },
      travis: {
        configFile: 'test/karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
      }
    },
    watch: {
      files: ['angular-gcms.js'],
      tasks: ['clean', 'jshint', 'ngAnnotate', 'uglify'],
      karma: {
        files: ['angular-gcms.js', 'test/unit/*.js'],
        tasks: ['karma:unit:run'] 
      }
    }
  });

  // Libraries
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-karma');

  // Default Tasks
  grunt.registerTask('default', ['clean', 'jshint', 'ngAnnotate', 'uglify']);
  grunt.registerTask('devmode', ['karma:unit', 'watch:karma']);
  grunt.registerTask('test', ['karma:travis']);

};
