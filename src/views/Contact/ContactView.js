import $ from 'jquery';
import _ from 'lodash';
import { View } from 'backbone';
import tmpl from './ContactView.html';

const ContactView = View.extend({


	tmpl: _.template(tmpl),

	render: function () {
		const activeModel = this.collection.findWhere({ active: true });
		if (!activeModel) {
			return this;
		}

		this.$el.html( this.tmpl(activeModel.toJSON()) );

		return this;
	}

});

export default ContactView;
