'use strict';
var fs = require('fs'),
    _ = require('underscore'),
    path = require('path');

exports.startsWith = function (str, preffix) {
    if (str) {
        return str.substring(0, preffix.length) === preffix
    }
}

exports.loadTask = function (grunt, name) {
    var cwd = process.cwd();
    process.chdir(__dirname + "/..");
    if (fs.existsSync(path.resolve('node_modules') + '/' + name)) {
        grunt.loadNpmTasks(name);
    }
    process.chdir(cwd);
}

exports.getOption = function(option, brand) {
    if (typeof option == 'string' && option.match(/\<%.*%\>/)) {
        var template = _.template(option);
        return template({brand: brand});
    }
    else {
        return option
    }
}

exports.capitaliseFirstLetter = function(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}


exports.isComponent = function(dep){
    return (/sg-component.*/i.test(dep));
}

exports.isIcon = function(dep){
    return (/(.*?)icon(.*?)/i.test(dep))
}

exports.isLibrary= function(dep){
    return (/(.*?)lib(.*?)/i.test(dep));
}

exports.getComponentName = function(bower) {
    return  bower.name.replace(/sg-(component-)?/i, "");
}