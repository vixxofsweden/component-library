'use strict';

const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const router = require('./router');
const chalk = require('chalk');

const app = express();

app.set('port', process.env.PORT || 3000);

let templatesDir = path.join(__dirname, 'templates');

const hbs = handlebars.create({
	extname: '.hbs',
	partialsDir: path.join(__dirname, 'dist/partials'),
	layoutsDir: path.join(__dirname, 'templates'),
	helpers: {
        partialName: (name) => {
            return name;
        },
	    escapedPartial: (partials, partialName, data) => {
	    	return partials[partialName](data.hash);
		}
    }
});

app.engine('hbs', hbs.engine);
app.set('views', templatesDir);
app.set('view engine', 'hbs');

app.use(express.static('packages'));
app.use(express.static('dist'));

app.use('/:component', router.component);
app.use('/', router.default);

app.listen(app.get('port'), () => {
	console.log('\n');
	console.log(chalk.green('Component library running on http://localhost:3000'));
});