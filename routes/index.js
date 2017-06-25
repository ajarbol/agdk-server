import keystone from 'keystone';
import { initLocals, flashMessages } from './middleware';
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', initLocals);
keystone.pre('render', flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	api: importRoutes('./api'),
};

// Setup Route Bindings
export default (app) => {
	// Views
	app.get('/', routes.views.index.default);
	app.get('/api/init', routes.api.init.default);

};
