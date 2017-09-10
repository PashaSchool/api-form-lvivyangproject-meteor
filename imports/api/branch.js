import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

//collecton employee
import {Employee} from './employee'

//schema
import { BranchSchema } from './schema/branch.schema.js'
import { SchemaId } from './schema/id.schema.js';
import { lmrStructureUnits } from './schema/structure_utinst.schema.js';

export const Branch = new Mongo.Collection('branch');


const returnCurrentBranch = (_id) => Promise.resolve(Branch.find({ _id }).fetch()[0]).then(branch => branch);

const getAllBranch = () => Promise.resolve(Branch.find({}).fetch()).then(branches => branches)

const filterByTitle = (structures, title) => {
    return structures.filter(structure => {
        return structure.title === title
    });
};



Meteor.methods({
    'branch.getAll' () { return getAllBranch() },
    'branch.getById' (_id) {
        try {
            SchemaId.validate({ _id })
        } catch (e) {
            throw new Meteor.Error(e.message)
        }

        return returnCurrentBranch(_id)
    },
    'branch.insert' (branch) {
        if (!this.userId) {
            throw new Meteor.Error('You are not have registration to do that')
        }
        try {
            BranchSchema.validate(branch)
        } catch (e) {
            return { error: new Meteor.Error(e.message) }
        }
        return Branch.insert(branch)
    },
    'branch.remove' (_id) {
        if (!this.userId) {
            throw new Meteor.Error('Потрібна авторизація')
        }

        try {
            SchemaId.validate({ _id });
        } catch (e) {
            throw new Meteor.Error(e.massage)
        }

        let branch;

        return Promise.resolve({...returnCurrentBranch(_id) })
            .then(obj => branch = obj)
            .then(() => Branch.remove({ _id }))
            .then(() => branch)

    },
    'branch.reset' () {
        return Branch.remove({});
    },
    'branch.update' (_id, updates) {
        if (!this.userId) {
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
            }).validate({ _id, ...updates });

        } catch (e) {
            return { error: new Meteor.Error(e) }
        }

        return Promise.resolve(Branch.update({ _id }, { $set: {...updates } }))
            .then(() => returnCurrentBranch(_id))
    },
    "branch.addUnitStructure" (branchId, unitStructure) {
        if (!this.userId) {
            throw new Meteor.Error('You dont have premmission to do that')
        }
        try {
            lmrStructureUnits.validate(unitStructure)
        } catch (e) {
            return { error: e }
        }
        Branch.update({ _id: branchId }, { $push: { lmr_structure_units: unitStructure } })
    },
    "branch.getStructureById" (_id, title) {
        function transform(doc) {
            return doc.lmr_structure_units
        }
        try {
            new SimpleSchema({
                title: {
                    type: String
                },
                _id: {
                    type: String
                }
            }).validate({ title, _id });
        } catch (e) {
            throw new Meteor.Error(e)
        };

       return Promise.resolve(
           Branch.find({_id}, {fields: {lmr_structure_units: 1} })
            .map(transform)[0])
            .then((response) => filterByTitle(response, title));
    },
    "branch.updateStrucutre"(_id, strId, updates) {
        if(!this.userId) {
            throw new Meteor.Erro("You dont have premission to do that")
        }
        try {
            new SimpleSchema({
                _id: {
                    type: String
                },
                description: {
                    type: String,
                    optional: true
                },
                title: {
                    type: String,
                    optional: true
                }
            }).validate({_id, ...updates});
            
        } catch(e) {
            throw new Meteor.Error(e)
        }

        Branch.update(
            {_id, "lmr_structure_units.strId": strId},
            {$set: 
                {
                    "lmr_structure_units.$.title": updates.title,
                    "lmr_structure_units.$.description" : updates.description
                }
            }
        )
    },
    "branch.deleteStructure"(branchId, structureID) {
        if(!this.userId) {
            throw new Meteor.Erro('You dont have premision to do that')
        }
        try {
            new SimpleSchema({
                branchId: {
                    type: String
                },
                structureID: {
                    type: String
                }
            }).validate({structureID, branchId})
        } catch(e){
            throw new Meteor.Error(e)
        }

        Branch.update({_id: branchId}, {$pull: {"lmr_structure_units": {strId: structureID}}});
    },
    'branch.showStructuresWithEmployee'(){
        return Promise.resolve(Branch.find({}).fetch())
        .then(newArray => {
            let res = newArray.reduce(reducer, []);
            return res;
        })
        .then(arr => arr)
    },
    'branch.getEmployee'(_id, title) {
        // dont work well
        // should not use this method

        try {
            new SimpleSchema({
                title: {
                    type: String
                },
                _id: {
                    type: String
                }
            }).validate({ title, _id });
        } catch (e) {
            throw new Meteor.Error(e)
        };

       return Promise.resolve(
           Branch.find({_id}, {fields: {lmr_structure_units: 1} })
            .map(transform)[0])
            .then((response) => filterByTitle(response, title));
    }
});

function reducer(acumulator, branch) {
    acumulator.push({
        ...branch,
        lmr_structure_units: branch.lmr_structure_units.reduce(reducerStructure, [])
    });
    return acumulator
}

function closureId(_id) {
    return function() {
        return Meteor.call('employee.getById', _id)
    }
}


function reducerStructure(array, structure) {
    let result = structure.employees.map( _id => {
        let foo = closureId(_id);
        return foo();
    });

    array.push({
        ...structure,
        employees: result
    });

    return array
}

function formate(obj) {
    return JSON.stringify(obj, null, 2)
}

// function mapBranch(branch) {
//     branch.forEach(str => {
//         str.lmr_structure_units.reduce(reduceStr, [])
//     })
// }

// function reduceStr(acumulator, )