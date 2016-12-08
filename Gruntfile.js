module.exports = function (grunt) {
  // 	require('time-grunt')(grunt);
  // 1. Вся настройка находится здесь
  //*
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // 'ftp-deploy': {
    //   build: {
    //     auth: {
    //       host: '',
    //       port: 21,
    //       authKey: 'key1'
    //     },
    //     src: 'assets/compiled/',
    //     dest: 'assets/compiled/',
    //   }
    // },
    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({browsers: ['last 12 version']})
        ]
      },
      dist: {
        	src: 'assets/css/*.css',
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'assets/css',
          src: ['*.css', '!*.min.css'],
          dest: 'assets/css',
          ext: '.min.css'
		    }]
      }
    },
    uglify: {
      target: {
        files: [{
          expand: true,
          cwd: 'assets/js',
          src: ['*.js', '!*.min.js'],
          dest: 'assets/js',
          ext: '.min.js'
			    }]
      }
    },
    sass: { // Task
      dist: { // Target
        options: { // Target options
          style: 'expanded'
        },
        files: { // Dictionary of files
          'assets/css/main.css': 'assets/scss/core.scss'
        }
      }
    },
    concat: {
      css: {
        src: [
		            'assets/css/*.min.css'
	            ],
        dest: 'assets/compiled/style.css'
      },
      js: {
        src: [
		            'assets/js/*.min.js'
	            ],
        dest: 'assets/compiled/script.js'
      }
    },
    // imagemin: {
    //   png: {
    //     options: {
    //       optimizationLevel: 7
    //     },
    //     files: [
    //       {
    //         expand: true,
    //         cwd: 'assets/img/',
    //         src: ['**/*.png'],
    //         dest: 'assets/i/',
    //         ext: '.png'
		  //       }
		  //     ]
    //   },
    //   jpg: {
    //     options: {
    //       progressive: true,
    //       optimizationLevel: 7
    //     },
    //     files: [
    //       {
    //         expand: true,
    //         cwd: 'assets/img/',
    //         src: ['**/*.jpg'],
    //         dest: 'assets/i/',
    //         ext: '.jpg'
		  //       }
		  //     ]
    //   }
    // },
    watch: {
      css: {
        files: ['assets/css/*.css', 'assets/js/*.js', 'assets/scss/*.scss', 'assets/scss/project/*.scss',
            'assets/scss/framy/*.scss'],
        tasks: ['sass', 'cssmin', 'uglify', 'concat'],
        options: {
          spawn: false,
        },
      },
    },

  });

  // 3. Тут мы указываем Grunt, что хотим использовать этот плагин
	grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks( 'grunt-compass' );
  // grunt.loadNpmTasks('grunt-ftp-deploy');

  // 4. Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале
    grunt.registerTask('default', ['sass','postcss','cssmin', 'uglify', 'concat' ]);
};
