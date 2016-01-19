import { Collection } from 'backbone';
import ContactModel from '../models/ContactModel';

const ContactsCollection = Collection.extend({
	model: ContactModel
});

export default ContactsCollection;
