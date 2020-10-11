module.exports = function (grunt) {
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });

    grunt.initConfig({
        //configuramos el plugin de sass para que genere la version de distribucion,
        //buscando en la carpeta css todos los archivos scss y genere los correspondientes
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'style',          // buscando en la carpeta style
                    src: ['*.scss'],       // todos los archivos a buscar
                    dest: 'style',           // carpeta de destino
                    ext: '.css' //extension
                }]
            }
        },
        //se agrega tarea para watch

        watch: {
            files: ['style/*.scss'],//cuando se haga un cambio en carpeta style de los archivos scss se va a ejecutar la tarea css
            task: ['css']  // tarea de grunt
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src: [                // que carpetas y archivos mirar
                        'style/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },
                options: {
                    watchTask: true,    // tarea de escucha constante
                    server: {
                        baseDir: "./" //Directorio base para el servidor
                    }
                }
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: './',
                    src: 'img/*.{png,gif,jpg,jpeg}',
                    dest: 'dist/'
                }]
            }
        },

        copy: {
            html: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: './',
                    src: ['*.html'],
                    dest: 'dist'
                }]
            },
            fonts: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'node_modules/open-iconic/font',
                    src: ['fonts/*.*'],
                    dest: 'dist'
                }]
            }
        },

        clean: {
            buil: {
                src: ['dist/']
            }
        },

        cssmin: {
            dist: {}
        },

        uglify: {
            dist: {}
        },

        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20
            },
            release: {
                files: [{
                    src: [
                        'dist/js/*.js',
                        'dist/css/*.css'
                    ]
                }]
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            dist: {}
        },

        useminPrepare: {
            foo: {
                dest: 'dist',
                src: ['index.html', 'contacto.html', 'ofertas.html', 'precios.html']
            },
            options: {
                flow: {
                    steps: {
                        css: ['cssmin'],
                        js: ['uglify']
                    },
                    post: {
                        css: [{
                            name: 'cssmin',
                            createConfig: function (context, block) {
                                var generated = context.options.generated;
                                generated.options = {
                                    keepSpecialComments: 0,
                                    rebase: false
                                }
                            }
                        }]
                    }
                }
            }
        },

        usemin: {
            html: ['dist/index.html', 'dist/contacto.html', 'dist/precios.html', 'dist/ofertas.html'],
            options: {
                assetsDir: ['dist','dist/css','dist/js']
            }
        }
    });

  /*  grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-browser-sync'); 
    grunt.loadNpmTasks('grunt-contrib-imagemin'); */
    grunt.registerTask('css', ['sass']);
    grunt.registerTask('default', ['browserSync', 'watch']); // Para al ejecutar grunt, se ejecute esta tarea como default
    grunt.registerTask('img:compress', ['imagemin']);
    grunt.registerTask('build', [
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin'
    ]);

}