import {SimpleSchema} from 'meteor/aldeed:simple-schema'

export const BranchSchema = new SimpleSchema({
	title: {
		type: String
	},
	subTitle: {
		type: String,
		optional: true
	},
	order: {
		type: Number,
		label: "порядок не встановленний"
	},
	isHidden: {
		type: Boolean,
		label: "Встановити видимість"
	},
	id: {
		type: String,
		optional: true
	},
	_id: {
		type: String,
		optional: true
	}
})