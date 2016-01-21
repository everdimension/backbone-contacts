import { Router } from 'backbone';

const ContactsRouter = Router.extend({

	routes: {
		"contact/:id": "showContact"
	},

	initialize: function (opts) {
		this.collection = opts.collection;
	},

	showContact: function (id) {
		console.log('show contact router fn');
		this.collection.selectModel(this.collection.get(id));
	}

});

export default ContactsRouter;
