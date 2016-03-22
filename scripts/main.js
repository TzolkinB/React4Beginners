import React from 'react';
// var React = require('react');
import ReactDOM from 'react-dom';
// to use ReactDOM, needed for browser

// App
class App extends React.Component{
	constructor() {
		super();
	}	
	render() {
		return(
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market"/>
				{/* tagline is props */}
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
			<header className="top">
				<h1>Catch 
					<span className="ofThe">
						<span className="of">of</span>
						<span className="the">the</span>
					</span>
				 Day</h1>
				<h3 className="tagline"><span>{this.props.tagline}</span></h3>
			</header>
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
