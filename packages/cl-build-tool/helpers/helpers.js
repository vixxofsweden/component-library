module.exports.register = function (Handlebars, context) {
    Handlebars.registerHelper("partialName", function (name) {
        return name;
    });
    Handlebars.registerHelper("partialEscaped", function (partialName) {
        return Handlebars.partials[partialName]();
    });
    Handlebars.registerHelper("concat", function () {
        var arg = Array.prototype.slice.call(arguments,0);
		arg.pop();
		return arg.join('');
    });
};


  