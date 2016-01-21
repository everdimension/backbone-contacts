import $ from 'jquery';
import _ from 'lodash';
import { View } from 'backbone';
import tmpl from './ContactViewTemplate.html';

const ContactView = View.extend({


	tmpl: _.template(tmpl),

	render: function () {
		const activeModel = this.collection.findWhere({ active: true });

		this.$el.html( this.tmpl(activeModel.toJSON()) );

		return this;
	}

});

export default ContactView;
