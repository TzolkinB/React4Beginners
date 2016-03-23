import React from 'react';
// var React = require('react');
import ReactDOM from 'react-dom';
// to use ReactDOM, needed for 
//import ReactRouter from 'react-router';
//import { Router, Route, History } from 'react-router';
var ReactRouter = require('react-router');
var Router  = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
import createBrowserHistory from 'history/lib/createBrowserHistory';
import helpers from './helpers';


// App
//class App extends React.Component{
var App = React.createClass({
	//constructor() {
	//	super();
	getInitialState() {
		return {
			fishes: {},
			order: {}
		}
	},
	addFish(fish) {
		var timestamp = (new Date()).getTime(); // gets unique timestamp
		this.state.fishes['fish-' + timestamp] = fish; //update state object
		this.setState({ fishes: this.state.fishes }); //set the state
	},	
		
	render() {
		return(
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market"/>
					{/* tagline is props */}
				</div>
				<Order />
				<Inventory addFish={this.addFish}/>
			</div>
		)
	}
});

// Add Fish Form
var AddFishForm = React.createClass({
//class AddFishForm extends React.Component{
  createFish(event) {
    // 1. Stop the form from submitting
    event.preventDefault();
    // 2. Take the data from the form and create an object
    var fish = {
      name: this.refs.name.value,
      price: this.refs.price.value,
      status: this.refs.status.value,
      desc: this.refs.desc.value,
      image: this.refs.image.value
    }

    // 3. Add the fish to the App State
    this.props.addFish(fish);
    this.refs.fishForm.reset();
  },
  render() {
    return (
      <form className="fish-edit" ref="fishForm" onSubmit={this.createFish}>
        <input type="text" ref="name" placeholder="Fish Name"/>
        <input type="text" ref="price" placeholder="Fish Price" />
        <select ref="status">
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" ref="desc" placeholder="Desc"></textarea>
        <input type="text" ref="image" placeholder="URL to Image" />
        <button type="submit">+ Add Item </button>
      </form>
		)
	}
});

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
			<div>
				<h2>Inventory</h2>
				<AddFishForm {...this.props} />
			</div>	
		)
	}
};
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

// If route is not found
class NotFound extends React.Component{
	render() {
		return(
			<h1>404 ERROR: Route Not Found</h1>
		)
	}
};

// Routes
let routes = (
	<Router history={createBrowserHistory()}>
		<Route path="/" component={StorePicker}/>
		<Route path="/store/:storeId" component={App}/>
		<Route path="*" component={NotFound}/>
	</Router>
	)

// ReactDOM.render(<StorePicker/>, document.querySelector('#main'));
var mountPoint = document.querySelector('#main');
ReactDOM.render(routes, mountPoint);
// pass routes into ReactDOM.render to use routes defined line 99
