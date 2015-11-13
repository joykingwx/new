module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        /*检测js文件*/
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        /*合并js文件*/
        concat: {
            options: {
                // 定义一个用于插入合并输出文件之间的字符
                separator: ';'
            },
            dist: {
                // 将要被合并的文件
                src: ['src/js/*.js'],
                // 合并后的JS文件的存放位置
                dest: 'dist/js/<%= pkg.name %>.js'
            }
        },
        /*压缩js文件*/
        uglify: {
            options: {
                // 此处定义的banner注释将插入到输出文件的顶部
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        /*合并css文件*/
        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            compress: {
                files: {
                    'dist/css/<%= pkg.name %>.min.css': [
                        "src/css/**/*.css"
                    ]
                }
            }
        },
       /*编译sass文件*/
        sass: {
            dist: {
                files: {
                    'src/css/<%= pkg.name %>.css': 'tpls/sass/style.scss'
                }
            }
        },
        /*拷贝文件*/
        copy: {
            images:{
                files:[
                    {expand: true,cwd: 'tpls/',src:['images/**'],dest: 'src/'}
                ]
            },
            main:{
                files: [
                    {expand: true,cwd: 'src/', src: ['**','!libs/**','!js/**','!css/**'], dest: 'dist/'}
                ]
            }
        },
        /*
        * 删除dist文件
        * */
        clean:{
            dist:{
                files: [{
                    src: 'dist/'
                }]
            }
        },
        /*侦听文件变动*/
        watch: {
            js:{
                files: ['<%= jshint.files %>'],
                tasks: ['jshint','concat']
            },
            css:{
                files: ['tpls/**'],
                tasks: ['sass','copy:images','cssmin']
            }

        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['watch','concat']);
    grunt.registerTask('clear',['clean:dist']);
    grunt.registerTask('dist',['sass','copy:images','jshint','copy:main','concat','uglify','cssmin']);
};