import React from 'react';
// var React = require('react');
import ReactDOM from 'react-dom';
// to use ReactDOM, needed for browser

// App
class App extends React.Component{
	render() {
		return(
			<div className="catch-of-the-day">
				<div className="menu">
					<Header />
				</div>
				<Order />
				<Inventory />
			</div>
		)
	}
};

// Header
class Header extends React.Component{
	render() {
		return(
			<p>Header</p>
		)
	}
}

// Order
class Order extends React.Component{
	render() {
		return(
			<p>Order</p>
		)
	}
}


// Inventory
class Inventory extends React.Component{
	render() {
		return(
			<p>Inventory</p>
		)
	}
}
// StorePicker
class StorePicker extends React.Component{
//var StorePicker = React.createClass
	render() {
	// render: function()	
		var name = 'Me';
		return(
			<form className="store-selector" action="">
			{/* using Emmet form + ctrl e */}
				<h1>Type Something</h1>
				<input type="text" ref="storeId"/>
				<input type="Submit"/>
			</form>
		);
	}
};

// ReactDOM.render(<StorePicker/>, document.querySelector('#main'));
var mountPoint = document.querySelector('#main');
ReactDOM.render(<App/>, mountPoint);
