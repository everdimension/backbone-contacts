import $ from 'jquery';
import _ from 'lodash';
import { View } from 'backbone';
import tmpl from './ContactsListView.html';
import PageTogglerView from '../PageToggler/PageTogglerView';
import ContactListItemView from '../ContactListItem/ContactListItemView';

const ContactsListView = View.extend({

	tmpl: _.template(tmpl),

	initialize: function (evt) {
		this.pageTogglerView = new PageTogglerView({ collection: this.collection });
	},

	render: function () {
		const compiled = this.tmpl({ contacts: this.collection.toJSON()});
		this.$el.html(compiled);

		this.renderPageToggler();
		this.renderContactListItems();

		return this;
	},

	renderPageToggler: function () {
		const rendered = this.pageTogglerView.render().el;
		this.$el.find('#pageToggler').append(rendered);
	},

	renderContactListItems: function () {
		const $list = this.$el.find('#thelist');
		this.collection.each(model => {
			const view = new ContactListItemView({ model });
			$list.append(view.render().el);
		});
	}
});

export default ContactsListView;
