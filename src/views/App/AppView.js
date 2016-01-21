import $ from 'jquery';
import _ from 'lodash';
import Backbone, { View } from 'backbone';
import tmpl from './AppView.html';
import ContactsListView from '../ContactsList/ContactsListView';
import ContactView from '../Contact/ContactView';
import ContactsRouter from '../../routers/ContactsRouter';
import vent from '../../vent';

const App = View.extend({
	tagName: 'div',

	tmpl: _.template(tmpl),

	initialize: function (opts) {

		this.collection = opts.collection;

		this.contactsListView = new ContactsListView({
			collection: this.collection
		});

		this.contactView = new ContactView({
			collection: this.collection
		});

		this.listenTo(this.collection, 'change:active', updatedModel => {
			this.renderContact();
		});

		this.collection.selectModel(this.collection.at(opts.activeIndex || 0));

		this.listenTo(vent, 'contact:active', this.navigate);

		this.contactsRouter = new ContactsRouter({ collection: this.collection });
		Backbone.history.start({ pushState: true });

		window.testDebug.contactsRouter = this.contactsRouter;

	},

	navigate: function (updatedModel) {
		console.log('navigate');
		const id = updatedModel.get('id');
		console.log('id', id);
		this.contactsRouter.navigate(`/contact/${id}`);
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
		const rendered = this.contactView.render().el;
		this.$el.find('#contact').html(rendered);
	}

});

export default App;
