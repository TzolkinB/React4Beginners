import React from 'react';
// var React = require('react');
import ReactDOM from 'react-dom';
// to use ReactDOM, needed for browser

// StorePicker

class StorePicker extends React.Component{
//var StorePicker = React.createClass
	render() {
	// render: function()	
		return(
			<div>
				<h1>Hello World</h1>
			</div>
		);
	}
};

// ReactDOM.render(<StorePicker/>, document.querySelector('#main'));
var mountPoint = document.querySelector('#main');
ReactDOM.render(<StorePicker/>, mountPoint);
