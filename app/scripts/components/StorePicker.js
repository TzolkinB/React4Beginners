// Store Picker
import React from 'react';
var ReactRouter = require('react-router');
var History = ReactRouter.History;

// StorePicker
var StorePicker = React.createClass({
  mixins : [History], //ES6 does not have mixin support
  goToStore(event) {
  	event.preventDefault();
  	var storeId = this.refs.storeId.value;
    // var storeId gets data from the input
	// this is StorePickers, refs is reference from ln80
	this.history.pushState(null, '/store/' + storeId);
	},
	render() {
		return (
			<form className="store-selector" onSubmit={this.goToStore}>
				<h2>Crazy Store Name</h2>
				<input type="text" ref="storeId" defaultValue={helpers.getFunName()} required />
				<input type="Submit" />
			</form>
		)
	}

});

export default StorePicker;