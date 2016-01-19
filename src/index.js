import $ from 'jquery';
import AppView from './views/AppView';
import ContactsCollection from './collections/ContactsCollection';

function jsonResponseHandler(res) {
	console.log('res', res);
	const isSuccess = res.status >= 200 && res.status < 300;
	return isSuccess ? res.json() : Promise.reject(res.statusText);
}

fetch('data/contacts.json')
	.then(jsonResponseHandler)
	.then(render)
	.catch(err => console.warn('err', err));


function render(data) {
	const contacts = new ContactsCollection(data);
	const app = new AppView({
		collection: contacts
	});

	$('#app').html(app.render().el);

}
