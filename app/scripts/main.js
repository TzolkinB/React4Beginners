import React from 'react';
// var React = require('react');
import ReactDOM from 'react-dom'; 

import { Router, Route, History } from 'react-router';
//var ReactRouter = require('react-router');
//var Router  = ReactRouter.Router;
//var Route = ReactRouter.Route;

import createBrowserHistory from 'history/lib/createBrowserHistory';
import helpers from './helpers';

//import Firebase from 'firebase';
// How we can use Firebase
var Rebase = require('re-base');
var base = Rebase.createClass('https://react-catchday.firebaseio.com/');
	// base is reference to Firebase database
import Catalyst from 'react-catalyst';	
import reactMixin from 'react-mixin';

// Import Components
import NotFound from './components/NotFound';
import StorePicker from './components/StorePicker';
import Header from './components/Header';
import Order from './components/Order';
import Inventory from './components/Inventory';
// AddFishForm is in Inventory bc used only in Inventory.js



// App
//class App extends React.Component{
	var App = React.createClass({
	//mixins: [Catalyst.LinkedStateMixin],  // cannot use mixins or bind with ES6	

	//instead of getInitialState() use:
	//constructor() {
		//super();
		//this.state = {
	getInitialState() {
		return {
			fishes: {},
			order: {}
		}
	},
	componentDidMount() {
		base.syncState(this.props.params.storeId + '/fishes', {
			context : this, //syncs with App Component
			state : 'fishes'
		});
		var localStorageRef = localStorage.getItem('order-' + this.props.params.storeId);
		if(localStorageRef){
			this.setState({
				order: JSON.parse(localStorageRef)
			});
		}
	},
	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem('order-' + this.props.params.storeId, JSON.stringify(nextState.order));
	},
	addToOrder(key) {
		this.state.order[key] = this.state.order[key] + 1 || 1;
		this.setState({order : this.state.order}); // update order
	},
	removeFromOrder(key) {
		delete this.state.order[key];
		this.setState({
			order: this.state.order
		});
	},
	addFish(fish) {
		var timestamp = (new Date()).getTime(); // gets unique timestamp
		this.state.fishes['fish-' + timestamp] = fish; //update state object
		this.setState({ fishes: this.state.fishes }); //set the state
	},	
	removeFish(key) {
	    if(confirm("Are you sure you want to remove this fish?")) {
			this.state.fishes[key]= null;
			this.setState({
				fishes: this.state.fishes
			});
		}
	},
	loadSamples() {
		this.setState({
			fishes: require('./sample-fishes')
		});
	},
	renderFish(key) {
		return <Fish key={key} index={key} details={this.state.fishes[key]} 
		addToOrder={this.addToOrder}/>
		// have to make new Fish Component since it's what is returning
	},

	render() {
		return(
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market"/>
					{/* tagline is props */}
					<ul className="list-of-fishes">
						{Object.keys(this.state.fishes).map(this.renderFish)}
					</ul>
				</div>
				<Order fishes={this.state.fishes} order={this.state.order} 
				removeFromOrder={this.removeFromOrder}/>
				<Inventory addFish={this.addFish} loadSamples={this.loadSamples}
				fishes={this.state.fishes} linkState={this.linkState.bind(this)}
				removeFish={this.removeFish}/>
			</div>
		)
	}
});
// add component using mixin then mixin info
reactMixin.onClass(App, Catalyst.LinkedStateMixin);
// add bind to line 106 bc linkState not called until after, on line 113

// OneFish TwoFish ThreeFish
var Fish = React.createClass({
//class Fish extends React.Component{ cannot load props of null
	onButtonClick() {
		console.log("Adding this fish: ", this.props.index);
		var key = this.props.index;
		this.props.addToOrder(key);
	},
	render() {
		var details = this.props.details;
		var isAvailable = (details.status === 'available' ? true : false);
		{/*  boolean for is available true or false */}
		var buttonText = (isAvailable ? 'Add To Order' : 'Sold Out');
		return ( 
			<li className="menu-fish"> {/* <li>{this.props.index}</li> Boring list lets add some css style! */}
				<img src={details.image} alt={details.name} />
				<h3 className="fish-name">
				{details.name}
				<span className="price">{helpers.formatPrice(details.price)}</span>
				</h3>
				<p>{details.desc}</p>
				<button disabled={!isAvailable} onClick={this.onButtonClick}>{buttonText}</button>
			</li>
		)
	}
});

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
