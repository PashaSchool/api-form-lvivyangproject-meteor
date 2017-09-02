import expect from 'expect'
import {Branch} from './branch.js'
import {Meteor} from 'meteor/meteor'
import axios from 'axios';

if(Meteor.isServer) {
	describe("Test 'Branch' CRUD", function(){
		let branch1 = {
			title: "title for branch 1",
			order: 1,
			isHidden: false,
			id: '4r4322'
		};
		let branch2 = {
			title: "title for branch 2",
			order: 2,
			isHidden: false,
			id: 'h6hd433'
		};
		let branch3 = {
			title: "title for branch 3",
			order: 3,
			isHidden: true,
			id: '23er544'
		};

		before(function(done){
			Promise.all([
				axios.post('http://localhost:3000/api/branches/addNewBranch', branch1),
				axios.post('http://localhost:3000/api/branches/addNewBranch', branch2),
				axios.post('http://localhost:3000/api/branches/addNewBranch', branch3),
			]).then((response) => {
				console.log('Data is posetd');
				return done()
			}).catch(error => {
				return done();
			})
		});

		after(function(done) {
			axios.delete('http://localhost:3000/api/clear')
			.then(() => {
				console.log('data is deleted')
				return done()
			})
			.catch(err => {
				return done();
				console.log('error is', err)
			})
		});


		it('should return three test-branches, using GETall request', function(done) {
			axios.get('http://localhost:3000/api/branches')
				.then((response) => response.data.body)
				.then((branches) => {
					console.log(branches.data);
					return branches.data.length
				})
				.then((len) => expect(len).toEqual(3))
				.then(() =>{
					console.log('data is tested');
					return done();
				})
				.catch(err => {
					console.log('test is failed', err); 
					return done()
				})
		});
			

	})
	
}