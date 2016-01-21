import $ from 'jquery';
import AppView from './views/App/AppView';
import ContactsCollection from './collections/ContactsCollection';

import 'normalize.css/normalize.css';
import './styles/main.css';

const INITIAL_ACTIVE_INDEX = 1;

window.testDebug = window.testDebug || {};


function jsonResponseHandler(res) {
	console.log('res', res);
	const isSuccess = res.status >= 200 && res.status < 300;
	return isSuccess ? res.json() : Promise.reject(res.statusText);
}

fetch('/data/contacts.json')
	.then(jsonResponseHandler)
	.then(render);
	// .catch(err => console.warn('err', err));


function render(data) {
	const contacts = new ContactsCollection(data);
	const app = new AppView({
		collection: contacts,
		activeIndex: INITIAL_ACTIVE_INDEX
	});

	window.testDebug.app = app;

	$('#app').html(app.render().el);

}
