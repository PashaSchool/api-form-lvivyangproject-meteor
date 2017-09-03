import {Mongo} from 'meteor/mongo'
import {Meteor} from 'meteor/meteor'
import {SimpleSchema} from 'meteor/aldeed:simple-schema'

import {BranchSchema} from './schema/branch.schema.js'
import {SchemaId} from './schema/id.schema.js';

export const Branch = new Mongo.Collection('branch');


const returnCurrentBranch = (_id) => Branch.find({_id}).fetch()[0];

const getAllBranch = () => Branch.find({}).fetch();

Meteor.methods({
	'branch.getAll'() { return getAllBranch()},
	'branch.getById'(_id) {
		try {
			SchemaId.validate({_id})
		} catch(e) {
			throw new Meteor.Error(e.message)
		}

		return returnCurrentBranch(_id)
	},
	'branch.insert'(branch) {
		// if(!this.userId) {
		// 	throw new Meteor.Error('You are not have registration to do that')
		// }
		try {
			BranchSchema.validate(branch)
		} catch(e) {
			return { error: new Meteor.Error(e.message) }
		}
		return Branch.insert(branch)
	},
	'branch.remove'(_id) {
		if(!this.userId) {
			throw new Meteor.Error('Потрібна авторизація')
		}

		try {
			SchemaId.validate({_id});
		} catch(e) {
			throw new Meteor.Error(e.massage)
		}

		let branch;

		return Promise.resolve({...returnCurrentBranch(_id)})
			.then(obj => branch = obj)
			.then(() => Branch.remove({_id}))
			.then(() => branch)

	},
	'branch.reset'() {
		return Branch.remove({});
	},
	'branch.update'(_id, updates) {
		if(!this.userId) {
			throw new Meteor.Error('Потрібна авторизація')
		}
		try {
			new SimpleSchema({
				_id: {
					type: String
				},
				title: {
					type: String,
					optional: true
				},
				isHidden: {
					type: Boolean,
					optional: true
				},
				order: {
					type: Number,
					optional: true
				}
			}).validate({_id, ...updates});	
			
		} catch(e) {
			return {error: new Meteor.Error(e)}
		}

		return Promise.resolve(Branch.update({_id}, {$set: {...updates} }))
			.then(() => returnCurrentBranch(_id))
	}
})

