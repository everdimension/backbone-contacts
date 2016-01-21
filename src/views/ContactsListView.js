import $ from 'jquery';
import _ from 'lodash';
import { View } from 'backbone';
import tmpl from './ContactsListViewTemplate.html';
import PageTogglerView from './PageTogglerView';

const ContactsListView = View.extend({

	tmpl: _.template(tmpl),

	events: {
		'click .ContactList__link': 'onClick'
	},

	initialize: function (evt) {
		this.pageTogglerView = new PageTogglerView({ collection: this.collection });
		this.listenTo(this.collection, 'change:active', this.setActiveClass);
	},

	onClick: function (evt) {
		evt.preventDefault();

		const id = parseInt(evt.target.getAttribute('data-id'));
		this.collection.get(id).set({ active: true });
	},

	setActiveClass: function (model) {
		const id = model.get('id');
		const $links = this.$el.find('a');
		$links.each((ind, link) => {
			const $link = $(link);
			const $li = $link.closest('li');
			$li.removeClass('active');
			if ($link.data('id') == id) {
				$li.addClass('active');
			}
		});
	},

	render: function () {
		const compiled = this.tmpl({ contacts: this.collection.toJSON()});
		this.$el.html(compiled);

		this.renderPageToggler();

		return this;
	},

	renderPageToggler: function () {
		const rendered = this.pageTogglerView.render().el;
		this.$el.find('#pageToggler').append(rendered);
	}
});

export default ContactsListView;
