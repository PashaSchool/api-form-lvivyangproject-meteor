import { SimpleSchema } from 'meteor/aldeed:simple-schema'

export const EmployyeSchema = new SimpleSchema({
    name: {
        type: String,
        min: 1
    },
    surname: {
        type: String
    },
    _id: {
        type: String,
        optional: true
    },
    thirdname: {
        type: String
    },
    position: {
        type: String
    },
    refer_to_structure: {
        type: String,
        optional: true
    }
})