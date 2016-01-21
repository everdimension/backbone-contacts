import $ from 'jquery';
import _ from 'lodash';
import { View } from 'backbone';
import tmpl from './ContactsListViewTemplate.html';

const ContactsListView = View.extend({

	tmpl: _.template(tmpl),

	events: {
		'click a': 'onClick', // doesn't work!...
		'click div': 'handleClick', // doesn't work!...
		'click #thelist': 'handleClick' // doesn't work!...
	},

	initialize: function (evt) {

		this.$el[0].addEventListener('click', evt => {
			if (evt.target.nodeName === 'A') {
				this.onClick(evt);
			}
		});
	},

	onClick: function (evt) {
		console.log('onclick');
		evt.preventDefault();

		const id = parseInt(evt.target.getAttribute('data-id'));
		this.collection.get(id).set({ active: true });

		this.setActiveClass(id);
	},

	setActiveClass: function (id) {
		const $links = this.$el.find('a');
		$links.each((ind, link) => {
			const $link = $(link);
			const $li = $link.closest('li');
			$li.removeClass('active');
			if ($link.data('id') == id) {
				$li.addClass('active');
			}
		});
	},

	render: function () {

		const compiled = this.tmpl({ contacts: this.collection.toJSON()});
		this.$el.html(compiled);

		return this;
	}
});

export default ContactsListView;
