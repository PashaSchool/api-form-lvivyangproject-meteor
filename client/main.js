import {Meteor} from 'meteor/meteor'
import {Branch} from '../imports/api/branch.js'
import { Tracker } from 'meteor/tracker'
import React from 'react'
import {render} from 'react-dom'

//components
import Routes from '../imports/routes'

//redux
import {Provider} from 'react-redux'
import {createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import reducer from '../imports/reducer'

const store = createStore(reducer, applyMiddleware(thunk));

Meteor.startup(() => {
	Tracker.autorun(() => {
		// console.log("Meteor.userId", Meteor.userId());
		// console.log("Data is tracked")
		const isAuthenticated = !!Meteor.userId();
		render(
			<Provider store={store}>
				<Routes isAuth={isAuthenticated} />
			</Provider>,
		 document.getElementById('root'));
	});
});


// import axios from 'axios'

// const API_URL = 'https://lviv-it-yangproject-api.herokuapp.com';
// const LOCAL_URL = 'http://localhost:3000';

// Meteor.startup(() => {
// 	document.getElementById('btn').addEventListener('click', function() {
// 		axios.get(API_URL + '/api/branches').then(res => {
// 			console.log(res)
// 		})
// 	});

// 	document.getElementById('btnFetch').addEventListener('click', function() {
// 		let data = {
// 			title: "DEEEEEEE", 
// 			order: 10, 
// 			isHidden: false
// 		};
// 		let config = {
// 			data,
// 			headers: {
// 				'Content-Type': 'application/json',
// 				'Access-Control-Allow-Origin': '*',
// 				'Access-Control-Allow-Methods': 'GET',
// 				'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
// 			}
// 		};
		
// 		axios.get(API_URL + '/api/branches/addNewBranch', config)
// 		.then(res => console.log('the response is', res))
// 		.catch((error) => console.log('the error is in', error))
		
// 	})
// })
