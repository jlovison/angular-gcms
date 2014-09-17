module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ["dist"],
    ngAnnotate: {
      build: {
        src: ['gcms.js'],
        dest: 'dist/gcms.min.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: [{
          src: 'dist/gcms.min.js',
          dest: 'dist/gcms.min.js'
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
    watch: {
      files: ['gcms.js'],
      tasks: ['clean', 'jshint', 'ngAnnotate', 'uglify']
    },
  });

  // Libraries
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default Tasks
  grunt.registerTask('default', ['clean', 'jshint', 'ngAnnotate', 'uglify']);

};
