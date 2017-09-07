import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { lmrStructureUnits } from './structure_utinst.schema'

export const BranchSchema = new SimpleSchema({
    title: {
        type: String
    },
    order: {
        type: Number,
        label: "порядок не встановленний"
    },
    _id: {
        type: String
    },
    lmr_structure_units: {
        type: [lmrStructureUnits],
        optional: true
    }

})