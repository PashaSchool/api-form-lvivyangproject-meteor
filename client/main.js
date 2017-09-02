import {Meteor} from 'meteor/meteor'
import {Branch} from '../imports/api/branch.js'
import { Tracker } from 'meteor/tracker'

import axios from 'axios'



// Tracker.autorun(() => console.log(Branch.find({id: 2}).fetch() ))

Meteor.startup(() => {
// 	document.getElementById('btn').addEventListener('click', function() {
// 		axios.put('http://localhost:3000/api/branches/' + 'Kj6JQKW5YxZJrHjdL', {
// 			title: "is the new title 2",
// 			subTitle: "sub title"
// 		}).then(res => {
// 			console.log(res)
// 		})
// 	});




	document.getElementById('btnFetch').addEventListener('click', function() {
		axios.post('http://localhost:3000/api/branches/addNewBranch', {
			title: "updatet title", 
			order: 3, 
			isHidden: false
		});
		// console.?log(d )
	})
})
