import $ from 'jquery';
import _ from 'lodash';
import { View } from 'backbone';
import tmpl from './PageTogglerViewTemplate.html';

const PageTogglerView = View.extend({

	tmpl: _.template(tmpl),

	events: {
		'click a': 'onToggle'
	},

	nextIndex: {
		next: currentIndex => currentIndex + 1,
		prev: currentIndex => currentIndex - 1
	},

	onToggle: function (evt) {
		evt.preventDefault();
		const direction = evt.target.getAttribute('data-direction');
		const newIndex = this.nextIndex[direction](this.currentIndex);
		this.collection.at(newIndex % this.collection.length).set({ active: true });
	},

	initialize: function () {
		this.listenTo(this.collection, 'change:active', this.render);
	},

	render: function (model) {
		const activeModel = model || this.collection.findWhere({ active: true });
		this.currentIndex = this.collection.indexOf(activeModel);
		const currentHumanIndex = this.currentIndex + 1;
		this.$el.html(this.tmpl({ currentHumanIndex }));
		return this;
	}

});

export default PageTogglerView;
