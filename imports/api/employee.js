import { EmployyeSchema } from './schema/employye.schema';
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import {SchemaId} from './schema/id.schema'
import {Meteor} from 'meteor/meteor'
import {Mongo} from 'meteor/mongo'


export const Employee = new Mongo.Collection('employee');


const isValid = () => { throw new Meteor.Error("validation error", "all data should be validate and required") };


Meteor.methods({
    'employee.getAll'()  {
        return Employee.find({}).fetch()
    },
    'employee.getById'(_id) {
        try {
            SchemaId.validate({_id})
        } catch(e) {
            isValid()
        }

        return  Employee.find({_id}).fetch()[0]
    },
    'employee.reset'() {
        if(!this.userId) {
            throw new Meteor.Error('You dont have premission to do that')
        }
        Employee.remove({});
    },
    'employee.insert'(employee) {
        if(!this.userId) {
            throw new Meteor.Error('You dont have premission to do that')
        }
        try {
            EmployyeSchema.validate(employee) 
        } catch (e) {
            isValid()
        }
        Employee.insert(employee)
    },
    'employee.delete'(_id) {
        if(!this.userId) {
            throw new Meteor.Error('You dont have premission to do that')
        }
        try {
            SchemaId.validate({_id})
        } catch(e) {
            isValid()
        }

        Employee.remove({_id})
    },
    'employee.update'(_id, updates) {

        if(!this.userId) {
            throw new Meteor.Error('You dont have premission to do that')
        }
       
        try {
            new SimpleSchema({
                name: {
                    type: String,
                    optional: true
                },
                surname: {
                    type: String,
                    optional: true
                },
                thirdname: {
                    type: String,
                    optional: true
                },
                _id: {
                    type: String,
                },
                position: {
                    type: String,
                    optional: true
                }
            }).validate({_id, ...updates})
        } catch(e) {
            isValid()
        }

        Employee.update({_id}, {$set: {...updates}})
    }
})