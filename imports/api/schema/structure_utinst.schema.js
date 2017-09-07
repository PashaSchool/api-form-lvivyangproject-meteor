import { SimpleSchema } from 'meteor/aldeed:simple-schema'

export const lmrStructureUnits = new SimpleSchema({
    sub_lmr_structure_title: {
        type: String,
        optional: true
    },
    description: {
        type: String,
        optional: true
    },
    a_part_of: {
        type: [String]
    },
    medium_upper_structure: {
        type: [String]
    },
    hight_upper_structure: {
        type: [String]
    },
    employees: {
        type: [Object]
    }
});