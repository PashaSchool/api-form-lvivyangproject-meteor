import expect from 'expect'
import {Branch} from './branch.js'
import {Meteor} from 'meteor/meteor'
// import axios from 'axios';


if(Meteor.isServer) {
	describe("Test 'Branch' CRUD", function(){
		let branch1 = {
			title: "title for branch 1",
			order: 1,
			isHidden: false,
			_id: '4r4322'
		};
		let branch2 = {
			title: "title for branch 2",
			order: 2,
			isHidden: false,
			_id: 'h6hd433'
		};
		let branch3 = {
			title: "title for branch 3",
			order: 3,
			isHidden: true,
			_id: '23er544'
		};

		let userId = '123';

		beforeEach(function(done){
			Promise.all([
				Meteor.server.method_handlers['branch.insert'].call({userId}, branch1),
				Meteor.server.method_handlers['branch.insert'].call({userId}, branch2),
				Meteor.server.method_handlers['branch.insert'].call({userId}, branch3)
			])
			.then( () => done());
		});

		afterEach(function(done) {
			Promise.resolve(Meteor.server.method_handlers['branch.reset']())
			.then(() => done());
		});

		describe("GET", function() {
			it('should return three test-branches, using GETall request', function(done) {
				Promise.resolve(Meteor.server.method_handlers['branch.getAll']())
					.then((result) => {
						return expect(result.length).toEqual(3)
					})
					.then(() => done())		
			});

			it('should return single branch by Id', function(done) {
				Promise.resolve(Meteor.server.method_handlers['branch.getById'](branch3._id))
				.then(branch => expect(branch.title).toEqual(branch3.title))
				.then(() => done())
				.catch(err => console.log(err))
			});
		});


		describe('DELETE', function() {
			it('should return error cause no anoth', function(done) {

				Promise.resolve(
					expect(() => {
						Meteor.server.method_handlers['branch.remove'](branch1._id)
					}).toThrow()
				).then(() => done())

			});

			it('should remove branch from collection', function(done) {
				let deletetBranch;

				Promise.resolve(
					Meteor.server.method_handlers['branch.remove'].call({userId}, branch1._id))
				.then(response => deletetBranch = response)
				.then(() => Meteor.server.method_handlers['branch.getAll']())
				.then((branches) => expect(branches).toExclude(deletetBranch))
				.then(() => done())

				
			})
		});

		describe('CREATE', function() {
			it('should create new branch', function(done) {
				let newBranch = {
						title: "New title",
						order: 4,
						isHidden: false
				};
				Promise.resolve(Meteor.server.method_handlers['branch.insert']
					.call({userId}, newBranch))
				.then(() => Meteor.server.method_handlers['branch.getAll']())
				.then(branches => expect(branches.length).toEqual(4))
				.then(() => done())
			});

			it('should throw error message', function(done) {
				let newBranch = {
						title: "New title",
						order: 4,
						isHidden: 'false'
				};

				Promise.resolve(
					Meteor.server.method_handlers['branch.insert'].call({userId}, newBranch)
				).then((response) => expect(response).toIncludeKey('error'))
				.then(() => done())
			})
		});

		describe('UPDATE', function() {
			it('should update title', function(done) {
				let updatedBranch;
				let title = 'new title'

				Promise.resolve(Meteor.server.method_handlers['branch.update'].apply(
					{userId}, [branch1._id, {title}]
				))
				.then(response => updatedBranch = response)
				.then(() => Meteor.server.method_handlers['branch.getById'](branch1._id))
				.then(branch => expect(branch.title).toEqual(title))
				.then(() => done())

			});

			it('should not update title', function(done) {
				let title = 5;

				Promise.resolve(
					Meteor.server.method_handlers['branch.update'].apply({userId}, [branch1._id, {title}])
				).then(res => expect(res).toIncludeKey('error'))
				.then(() => done())

			})
		})
			

	})
	
}