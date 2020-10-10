module.exports = function (grunt) {
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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.registerTask('css', ['sass']);
}