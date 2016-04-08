module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-cache-bust');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-pngmin');
    grunt.loadNpmTasks('grunt-notify');
    var productionBuild = !!(grunt.cli.tasks.length && grunt.cli.tasks[0] === 'build');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        project: {
            src: 'src/js',
            js: '<%= project.src %>/game/{,*/}*.js',
            dest: 'build/js',
            bundle: 'build/js/app.min.js',
            port: 3017
        },
        connect: {
            dev: {
                options: {
                    port: '<%= project.port %>',
                    base: './build'
                }
            }
        },
        jshint: {
            files: ['gruntfile.js', '<%= project.js %>'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        watch: {
            options: {
                livereload: productionBuild ? false : 3018
            },
            js: {
                files: '<%= project.dest %>/**/*.js',
                tasks: ['notify:watch_js']
            },
            images: {
                files: 'src/images/**/*',
                tasks: ['copy:images','notify:watch_images']
            },
            audio: {
                files: 'src/audio/**/*',
                tasks: ['copy:audio','notify:watch_audio']
            },
            maps: {
                files: 'src/maps/**/*',
                tasks: ['copy:maps','notify:watch_maps']
            }
        },
        notify: {
            watch_js: {
                options: {
                    message: 'Javascript changed'
                }
            },
            watch_images: {
                options: {
                    message: 'Images changed'
                }
            },
            watch_audio: {
                options: {
                    message: 'Audio changed'
                }
            },
            watch_maps: {
                options: {
                    message: 'Maps changed'
                }
            }

        },
        browserify: {
            app: {
                src: ['<%= project.src %>/game/app.js'],
                dest: '<%= project.bundle %>',
                options: {
                    transform: ['browserify-shim'],
                    watch: true,
                    browserifyOptions: {
                        debug: !productionBuild
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:3017'
            }
        },
        cacheBust: {
            options: {
                assets: ['audio/**', 'images/**', 'js/**'],
                baseDir: './build/',
                deleteOriginals: true,
                length: 5
            },
            files: {
                src: ['./build/js/app.min.*', './build/index.html']
            }
        },
        clean: ['./build/'],
        pngmin: {
            options: {
                ext: '.png',
                force: true
            },
            compile: {
                files: [{
                    src: 'src/images/*.png',
                    dest: 'src/images/'
                }]
            }
        },
        copy: {
            images: {
                files: [{
                    expand: true,
                    cwd: 'src/images/',
                    src: ['**'],
                    dest: 'build/images/'
                }]
            },
            audio: {
                files: [{
                    expand: true,
                    cwd: 'src/audio/',
                    src: ['**'],
                    dest: 'build/audio/'
                }]
            },
            phaser: {
                files: [{
                    cwd: 'src/js/lib/',
                    src: 'phaser.min.js',
                    dest: 'build/js/',
                    expand: true
                }]
            },
            html: {
                files: [{
                    cwd: 'src/',
                    src: 'index.html',
                    dest: 'build/',
                    expand: true
                }]
            },
            maps: {
                files: [{
                    cwd: 'src/maps/',
                    src: ['**'],
                    dest: 'build/maps/',
                    expand: true
                }]
            },
        },
        uglify: {
            options: {
                banner: '<%= project.banner %>'
            },
            dist: {
                files: {
                    '<%= project.bundle %>': '<%= project.bundle %>'
                }
            }
        },
        compress: {
            options: {
                archive: '<%= pkg.name %>.zip'
            },
            zip: {
                files: [{
                    expand: true,
                    cwd: 'build/',
                    src: ['**/*'],
                    dest: '<%= pkg.name %>/'
                }]
            },
            cocoon: {
                files: [{
                    expand: true,
                    cwd: 'build/',
                    src: ['**/*']
                }]
            }
        }
    });
    grunt.registerTask('default', [
        'clean', 
        "notify",
        'browserify', 
        'copy:images',
        'copy:audio', 
        'copy:phaser', 
        'copy:html',
        "copy:maps", 
        'connect',
        'open',
        'watch',

    ]);
    grunt.registerTask('build', [
        /*'jshint'
           , */
        'clean', 
        'browserify', 
        'uglify', 
        'copy:images',
        'copy:audio', 
        'copy:phaser', 
        'copy:html',
        "copy:maps",
        'cacheBust',
        'connect', 
        'open', 
        'watch'
    ]);
    grunt.registerTask('optimise', ['pngmin', 'copy:images']);
    grunt.registerTask('cocoon', ['compress:cocoon']);
    grunt.registerTask('zip', ['compress:zip']);
};