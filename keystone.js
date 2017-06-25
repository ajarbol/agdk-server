// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

require('babel-register');
require('babel-polyfill');

// Require keystone
const keystone = require('keystone');
const routes = require('./routes');

keystone.init({
	'name': 'Autisme Guiden',
	'brand': 'Autisme Guiden',

	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'pug',

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'Admin',
	'admin path': 'admin',
});
keystone.import('models');
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});
keystone.set('routes', routes.default);

keystone.set('nav', {
	users: 'admins',
	content: ['sections', 'articles'],
});


keystone.start();
