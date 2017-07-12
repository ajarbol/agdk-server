import keystone from 'keystone';
const Section = keystone.list('Section');
const Article = keystone.list('Article');


export default (req, res) => {
	Promise.all([
		Section.model.find(),
		Article.model.find(),
	])
	.then(([sections, articles]) => {
		const screens = {};
		sections.forEach((section) => {
			screens[section.screen] = {
				content: section.content || '',
				articles: articles.filter((article) => article.section.equals(section._id))
					.map(({ key, title, linkText, content }) => ({ key, title, linkText, content })),
			};
		});
		res.json({ status: 'OK', screens });
	})
	.catch(() => res.error('Something went wrong!'));
};
