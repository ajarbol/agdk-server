import keystone from 'keystone';
var Types = keystone.Field.Types;

/**
 * Article Model
 * ==========
 */
var Article = new keystone.List('Article', {
  autokey: { from: 'title', path: 'key', unique: true },
  map: { name: 'title' },
});

Article.add({
  title: { label: 'Titel', type: Types.Text, required: true, initial: true, index: true },
  linkText: { label: 'Link tekst',  type: Types.Text, initial: true, required: true },
  content: { label: 'Indhold', type: Types.Html, wysiwyg: true },
  section: { label: 'Side', type: Types.Relationship, ref: 'Section', initial: true, required: true, index: true },
  status: { 
    type: Types.Select,
    options: [
      { value: 'DRAFT', label: 'Kladde' },
      { value: 'PUBLISHED', label: 'Publiseret' },
    ],
    required: true,
    default: 'DRAFT',
  },
  updatedAt: { label: 'Sidst opdateret', type: Types.Datetime, default: Date.now, noedit: true },
});

/**
 * Triggers
 */
Article.schema.pre('save', function (next) {
  this.updatedAt = Date.now;
  next();
});

/**
 * Registration
 */
Article.defaultColumns = 'title, updatedAt';
Article.register();
