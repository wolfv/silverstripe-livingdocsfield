grunt = require('grunt')
path = require('path')

# load all grunt tasks
require('load-grunt-tasks')(grunt)

grunt.initConfig
  recess:
    development:
      options:
        compile: true
      files: [
        expand: true
        cwd: './src'
        src:['css/*.less']
        dest: '.tmp/'
        ext: '.css'
        filter: (src) ->
          return src.split('/').pop()[0] != '_'
      ]

  sass:
    dist:
      files: [
        expand: true
        cwd: './src'
        src:['css/*.scss']
        dest: '.tmp/'
        ext: '.css'
        filter: (src) ->
          return src.split('/').pop()[0] != '_'
      ]

  stylus:
    compile:
      options:
        compress: true
      files: [
        expand: true
        cwd: './'
        src: [ 'src/css/*.styl' ]
        dest: '.tmp/'
        ext: '.css'
        filter: (src) ->
          return src.split('/').pop()[0] != '_'
      ]

  lddesign:
    development:
      options:
        templatesDirectory: 'components'
        configurationElement: 'script[type=ld-conf]'
      files: [
        expand: true
        cwd: './src'
        src: ['./']
        dest: '.tmp/'
      ]
    build:
      options:
        minify:
          collapseWhitespace: true
          removeComments: true
          removeCommentsFromCDATA: true
          removeCDATASectionsFromCDATA: true
        templatesDirectory: 'components'
        configurationElement: 'script[type=ld-conf]'
      files: [
        expand: true
        cwd: './src'
        src: ['./']
        dest: '.tmp/'
      ]

  copy:
    assets:
      files: [
        expand: true
        cwd: './src'
        src:[
          './images/**'
          './index.html'
        ]
        dest: '.tmp/'
        # exclude empty directories
        filter: (src) ->
          return src.split('/').pop().indexOf('.') != -1
      ]
    tmpToDist:
      files: [
        expand: true
        cwd: '.tmp/'
        src: ['**/*']
        dest: 'dist/'
      ]
    css:
      files: [
        expand: true
        cwd: './src'
        src:['css/**/*.css']
        dest: '.tmp/'
      ]
    editor:
      files: [
        expand: true
        cwd: 'dist/'
        src: ['**']
        dest: '../livingdocs-editor/app/designs/dist/'
      ]
    engine:
      files: [
        expand: true
        cwd: 'dist/'
        src: ['**']
        dest: '../livingdocs-engine/public/designs/boilerplate/'
      ]

  autoprefixer:
    styles:
      expand: true
      flatten: true
      src: '.tmp/css/*.css'
      dest: '.tmp/css/'

  watch:
    scripts:
      files: ['src/**/*']
      tasks: ['default']
      options:
        nospawn: true
        livereload: 35769

  clean:
    preBuild: ['.tmp/', 'dist/']
    postBuild: ['.tmp/']

  bump:
    options:
      files: ['package.json', 'bower.json', 'src/config.json']
      commitFiles: ['-a'], # '-a' for all files
      pushTo: 'origin'
      push: true

  express:
    dev:
      options:
        port: 3333
        hostname: 'localhost'
        open: true
        server: './server'

  concurrent:
    tasks: ['express']


grunt.registerTask "postCompile", [
  "recess"
  "sass"
  "stylus"
  "copy:assets"
  "copy:css"
  "autoprefixer"
  "copy:tmpToDist"
  "clean:postBuild"
]


grunt.registerTask "build", [
  "clean:preBuild"
  "lddesign:development"
  "postCompile"
]


grunt.registerTask "serve", [
  "default"
  "express"
  "watch"
]

# Release a new version
# Only do this on the `master` branch.
#
# options:
# release:patch
# release:minor
# release:major
grunt.registerTask 'release', (type) ->
  type ?= 'patch'
  grunt.task.run('bump-only:' + type)
  grunt.task.run('build')
  grunt.task.run('bump-commit')


grunt.registerTask "default", ["build"]
grunt.registerTask "dev", ["serve"]

