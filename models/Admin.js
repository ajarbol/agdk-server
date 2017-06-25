import keystone from 'keystone';
const Types = keystone.Field.Types;

/**
 * Admin Model
 * ==========
 */
const Admin = new keystone.List('Admin');

Admin.add({
	name: { label: 'Navn', type: Types.Name, required: true, index: true },
	email: { label: 'Email', type: Types.Email, initial: true, required: true, unique: true, index: true },
	password: { label: 'Kodeord', type: Types.Password, initial: true, required: true },
}, 'Permissions', {
	isAdmin: { label: 'Aktiv?', type: Boolean, index: true },
});

// Provide access to Keystone
Admin.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Registration
 */
Admin.defaultColumns = 'name, email, isAdmin';
Admin.register();
