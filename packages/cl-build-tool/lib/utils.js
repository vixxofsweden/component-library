'use strict';

exports.startsWith = function (str, preffix) {
    if (str) {
        return str.substring(0, preffix.length) === preffix
    }
};