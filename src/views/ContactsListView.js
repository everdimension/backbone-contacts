import $ from 'jquery';
import { View } from 'backbone';

const ContactsListView = View.extend({
	tagName: 'ul',

	render: function () {
		var self = this;
		this.$el.html('');
		this.collection.forEach(function (model) {
			self.$el.append(model.get('first_name'));
		});
		return this;
	}
});

export default ContactsListView;
