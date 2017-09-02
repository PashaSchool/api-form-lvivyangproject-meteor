import {Mongo} from 'meteor/mongo'
import {Meteor} from 'meteor/meteor'
import {SimpleSchema} from 'meteor/aldeed:simple-schema'

import {BranchSchema} from './schema/branch.schema.js'
import {SchemaId} from './schema/id.schema.js';

export const Branch = new Mongo.Collection('branch');

Meteor.methods({
	'branch.getAll'() {
		return Branch.find({}).fetch()
	},
	'branch.insert'(branch) {
		// let {title, subTitle, isHidden, order} = branch;
		try {
			BranchSchema.validate(branch)
		} catch(e) {
			throw new Meteor.Error(e.message)
		}
		Branch.insert(branch)
	},
	'branch.remove'(_id) {

		try {
			SchemaId.validate({_id});
		} catch(e) {
			throw new Meteor.Error(e.massage)
		}
		Branch.remove(_id)

	},
	'branch.reset'() {
		return Branch.remove({});
	},
	'branch.update'(_id, updates) {
		console.log('the branch from api folder is', _id, updates);
		try {
			new SimpleSchema({
				_id: {
					type: String
				}
			}).validate({_id})
			
		} catch( e ) {
			throw new Meteor.Error(e.message)
		}

		Branch.update({_id}, {$set: {...updates} })
	}
})

