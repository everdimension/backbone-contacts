import $ from 'jquery';
import { View } from 'backbone';
import ContactsListView from './ContactsListView';

console.log('backbone', View);

const App = View.extend({
	tagName: 'div',
	initialize: function (opts) {
		console.log('init view app', opts);

		this.collection = opts.collection;
		console.log('this.collection', this.collection);

		this.contactsListView = new ContactsListView({
			collection: this.collection
		});
		// this.renderContactsList();
	},

	render: function () {

		this.$el.html('hi!');
		this.renderContactsList();
		return this;
	},

	renderContactsList: function () {
		const rendered = this.contactsListView.render().el;
		console.log('rendered list', rendered);
		this.$el.append(
			rendered
		);
	}
});

export default App;
