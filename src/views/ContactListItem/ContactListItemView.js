import $ from 'jquery';
import _ from 'lodash';
import { View } from 'backbone';
import tmpl from './ContactListItemView.html';

const ContactListItemView = View.extend({

	tagName: 'li',
	className: 'ContactList__item',

	tmpl: _.template(tmpl),

	events: {
		'click a': 'selectModel'
	},

	initialize: function () {
		this.listenTo(this.model, 'change:active', this.updateActiveClass);
	},

	selectModel: function (evt) {
		evt.preventDefault();
		this.model.collection.selectModel(this.model);
	},

	updateActiveClass: function (updatedModel) {
		this.$el.toggleClass('active', updatedModel.get('active'));
	},

	render: function () {
		this.$el.html(this.tmpl(this.model.toJSON()));
		this.updateActiveClass(this.model);
		return this;
	}

});

export default ContactListItemView;
