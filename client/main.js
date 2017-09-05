import {Meteor} from 'meteor/meteor'
import {Branch} from '../imports/api/branch.js'
import { Tracker } from 'meteor/tracker'

import axios from 'axios'

const API_URL = 'https://lviv-it-yangproject-api.herokuapp.com';
Meteor.startup(() => {
	document.getElementById('btn').addEventListener('click', function() {
		axios.get('http://localhost:3000/api/branches').then(res => {
			console.log(res)
		})
	});

	document.getElementById('btnFetch').addEventListener('click', function() {
		let data = {
			title: "updatet title", 
			order: 3, 
			isHidden: false
		};
		let config = {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
				'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
			}
		};
		
		axios.post('http://localhost:3000/api/branches/addNewBranch', data, config)
		.then((response) => console.log('data is', response ))
		.catch((error) => console.log('the error is in', error))
		
	})
})
