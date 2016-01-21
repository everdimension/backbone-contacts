import $ from 'jquery';
import _ from 'lodash';
import { View } from 'backbone';
import tmpl from './AppView.html';
import ContactsListView from './ContactsListView';
import ContactView from './ContactView';

const App = View.extend({
	tagName: 'div',

	tmpl: _.template(tmpl),

	events: {
		'click #contact': 'handleClick'
	},

	handleClick: function (evt) {
		console.log('handleClick!...');
	},

	initialize: function (opts) {

		this.collection = opts.collection;
		this.collection.at(0).set({ active: true }, { silent: true });

		this.contactsListView = new ContactsListView({
			collection: this.collection
		});

		this.contactView = new ContactView({
			collection: this.collection
		});

		this.listenTo(this.collection, 'change:active', updatedModel => {
			this.collection.each(
				model => model.set({
					active: model.id === updatedModel.id
				}, { silent: true })
			);

			this.renderContact();
		});

		this.render();
	},

	render: function () {

		this.$el.html(this.tmpl);
		this.renderContact();
		this.renderContactsList();

		return this;
	},

	renderContactsList: function () {
		const rendered = this.contactsListView.render().el;
		this.$el.find('#contactsList').html(rendered);
	},
	renderContact: function () {
		// const rendered = this.contactsListView.render().el;
		this.$el.find('#contact').html( this.contactView.render().el );
	}

});

export default App;
