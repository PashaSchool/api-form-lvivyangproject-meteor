import { Meteor } from 'meteor/meteor';
import {Branch} from '../imports/api/branch.js'
import { Restivus } from 'meteor/nimble:restivus'



if(Meteor.isServer) {
	const API = new Restivus({
		useDefaultAuth: false,
		enableCors: true,
		prettyJson: true,
		defaultHeaders: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
			'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
		}
	});

	API.addCollection(Branch);

	API.addRoute('branches',  { authRequired: false }, {
		get: {
			action() {

				return {
					
					body: {
						data: Meteor.call('branch.getAll'),
						headers: {
							'Content-Type': 'application/json',
							'Access-Control-Allow-Origin': '*',
							'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
							'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
						}
					}
				}
		    }
		}
	}); //get all branches
	API.addRoute('clear',  { authRequired: false }, {
		delete: {
			action() {
				return {
					statusCode: 200,
					body: {
						status: 'success',
						data: Meteor.call('branch.reset')
					}
				}
		    }
		}
	}); //get all branches

	API.addRoute('branches/addNewBranch', { authRequired: false }, {
		post: {
			action() {
				let newBranch = this.bodyParams;
				return {
					body: {
						data: Meteor.call('branch.insert', newBranch),
						headers: {
							'Content-Type': 'application/json',
							'Access-Control-Allow-Origin': '*',
							'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
							'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
						}
					}

				}
			}
		}
	}); // post new branches

	API.addRoute('branches/:branchId', { authRequired: false }, {
		delete: {
			action() {
				let id = this.urlParams.branchId;
				return {
					statusCode: 200,
					body: {
						status: 'success',
						data: Meteor.call('branch.remove', id)
					}
				};
			}
		},
		// put: {
		// 	action() {
		// 		let id = this.urlParams.branchId;
		// 		let updates = this.bodyParams;
		// 		console.log(id, updates);
		// 		return {
		// 			statusCode :200,
		// 			body: {
		// 				status: "success",
		// 				data: Meteor.call('branch.update', id, updates)
		// 			}
		// 		}
		// 	}
		// },
		get: {
			action() {
				const _id = this.urlParams.branchId;

				return {
					body: {
						data: Meteor.call('branch.getById'),
						headers: {
								'Content-Type': 'application/json',
								'Access-Control-Allow-Origin': '*',
								'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
								'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
						}
					}
				}
			}
		}
	}); // update and delete some branches

	// API.addRoute('branches/')

}



	// API.addRoute('branches/employers', { authRequired: false }, {
	// 	get: {
	// 		action() {
	// 			return {
	// 				statusCode: 200,
	// 				body: {
	// 					status: 'success',
	// 					data: Meteor.call('employee.getAll')
	// 				}
	// 			}
	// 		}
	// 	}
	// });

	// API.addRoute('branches/addEmployyer', { authRequired: false }, {
	// 	post: {
	// 		action() {
	// 			let employer = this.bodyParams;
	// 			return {
	// 				statusCode: 200,
	// 				body: {
	// 					status: 'success',
	// 					data: Meteor.call('employee.insert', employer)
	// 				}
	// 			}
	// 		}
	// 	}
	// });

	// API.addRoute('branches/employers/:id', { authRequired: false }, {
	// 	delete: {
	// 		action() {
	// 			const _id = this.urlParams.id;

	// 			return {
	// 				status: 'success',
	// 				data: Meteor.call('employee.delete', _id)
	// 			}

	// 		}
	// 	},
	// 	put: {
	// 		action() {
	// 			const _id = this.urlParams.id;
	// 			const updates = this.bodyParams;

	// 			return {
	// 				status: 'success',
	// 				data: Meteor.call('employee.update', _id, updates)
	// 			}
	// 		}
	// 	},
	// 	get: {
	// 		action() {
	// 			const _id = this.urlParams.id;
	// 			return {
	// 				status: 'success',
	// 				data: Meteor.call('employee.getOne', _id)
	// 			}
	// 		}
	// 	}
	// })

