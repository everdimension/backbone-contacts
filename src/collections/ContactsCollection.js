import { Collection } from 'backbone';
import ContactModel from '../models/ContactModel';
import vent from '../vent';

const ContactsCollection = Collection.extend({
	model: ContactModel,

	selectModel: function (model) {
		this.each(model => model.set({ active: false }));
		model.set({ active: true });
		vent.trigger('contact:active', model);
	}
});

export default ContactsCollection;
