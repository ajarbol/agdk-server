import keystone from 'keystone';
const Types = keystone.Field.Types;

/**
 * Section Model
 * ==========
 */
const Section = new keystone.List('Section', {
	autokey: { from: 'screen', path: 'key', unique: true },
	map: { name: 'screen' },
	nocreate: true,
	nodelete: true,
});

Section.add({
	screen: { label: 'Skærm', type: Types.Select, options: [
		{ value: 'VIEW_MORE', label: 'Læs mere' },
		{ value: 'INTERACTION', label: 'Interaktion' },
		{ value: 'COMMUNICATION', label: 'Kommunikation' },
		{ value: 'PLANNING', label: 'Planlægning' },
	], required: true, initial: true, noedit: true, index: true },
	content: { label: 'Indhold', type: Types.Html, wysiwyg: true },
	updatedAt: { label: 'Sidst opdateret', type: Types.Datetime, default: Date.now, noedit: true },
});

/**
 * Relationships
 */
Section.relationship({ path: 'articles', ref: 'Article', refPath: 'section' });

/**
 * Triggers
 */
Section.schema.pre('save', function (next) {
	this.updatedAt = Date.now;
	next();
});

/**
 * Registration
 */
Section.defaultColumns = 'screen, updatedAt';
Section.register();
