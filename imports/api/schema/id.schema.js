import {SimpleSchema} from 'meteor/aldeed:simple-schema'

export const SchemaId = new SimpleSchema({
	_id: {
		type: String,
		min: 1
	}
})