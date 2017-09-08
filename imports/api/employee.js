import { EmployyeSchema } from './schema/employye.schema';
import {Meteor} from 'meteor/meteor'
import {Mongo} from 'meteor/mongo'


export const Employee = new Mongo.Collection('employee');

Meteor.methods({
    'employee.getAll'()  {
        return Employee.find({}).fetch()
    },
    'employee.insert'(employee) {
        try {
            EmployyeSchema.validate(employee) 
        } catch (e) {
            throw new Meteor.Error(e)
        }
        Employee.insert(employee)
    }
})