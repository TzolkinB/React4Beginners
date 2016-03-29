// Store Picker
import React from 'react';
import { History } from 'react-router';
//var ReactRouter = require('react-router');
//var History = ReactRouter.History;
//import react-mixin to use mixin functionality in ES6
import reactMixin from 'react-mixin';

// StorePicker
class StorePicker extends React.Component {
//var StorePicker = React.createClass({
  //mixins : [History], ES6 does not have mixin or bind support, use react-mixin

  goToStore(event) {
  	event.preventDefault();
  	var storeId = this.refs.storeId.value;
    // var storeId gets data from the input
	// this is StorePickers, refs is reference from ln80
	this.history.pushState(null, '/store/' + storeId);
	}
	render() {
		return (
			<form className="store-selector" onSubmit={this.goToStore}>
				<h2>Crazy Store Name</h2>
				<input type="text" ref="storeId" defaultValue={helpers.getFunName()} required />
				<input type="Submit" />
			</form>
		)
	}

};
// add to use mixin
reactMixin.onClass(StorePicker, History);

export default StorePicker;