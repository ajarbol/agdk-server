import _ from 'lodash';


/**
	Initialises the standard view locals
*/
export const initLocals = (req, res, next) => {
	res.locals.navLinks = [
		{ label: 'Home', key: 'home', href: '/' },
	];
	res.locals.user = req.user;
	next();
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/
export const flashMessages = (req, res, next) => {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
export const requireUser = (req, res, next) => {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};
