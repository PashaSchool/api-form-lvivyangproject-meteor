import {Meteor} from 'meteor/meteor'
import {Branch} from '../imports/api/branch.js'
import { Tracker } from 'meteor/tracker'

import axios from 'axios'



// Tracker.autorun(() => console.log(Branch.find({id: 2}).fetch() ))

Meteor.startup(() => {
	document.getElementById('btn').addEventListener('click', function() {
		axios.get('https://lviv-it-yangproject-api.herokuapp.com/api/branches').then(res => {
			console.log(res)
		})
	});

	// document.getElementById('btnFetch').addEventListener('click', function() {
	// 	axios.post('https://lviv-it-yangproject-api.herokuapp.com/api/branches/addNewBranch', {
	// 		title: "updatet title", 
	// 		order: 3, 
	// 		isHidden: false
	// 	});
	// 	// console.?log(d )
	// })

	document.getElementById('btnFetch').addEventListener('click', function() {

		axios.post('https://lviv-it-yangproject-api.herokuapp.com/api/branches/addNewBranch', {
			title: "updatet title", 
			order: 3, 
			isHidden: false
		})
		
	})
})
