import {Employee} from './employee'
import {Meteor} from 'meteor/meteor'
import expect from 'expect'

if(Meteor.isServer) {
    describe.only('Test "Employee" CRUD ', () => {
        let employee1 = {
            name: "SomeName",
            surnam: "SomeSurname",
            thirdname: "SomeThirdName",
            position: "like a boss"
        };
        let employee2 = {
            name: "SomeName",
            surnam: "SomeSurname",
            thirdname: "SomeThirdName",
            position: "like a boss"
        };
        let employee3 = {
            name: "SomeName",
            surnam: "SomeSurname",
            thirdname: "SomeThirdName",
            position: "like a boss"
        };

        let userId = "someUserId";

        beforeEach((done) => {

            Promise.all([
                Meteor.server.method_handlers['employee.insert'].call({userId}, employee1),
                Meteor.server.method_handlers['employee.insert'].call({userId}, employee2),
                Meteor.server.method_handlers['employee.insert'].call({userId}, employee3)
            ]).then(() => done());
            
        })

        it('should return all employees', () => {
            
        })
    })
}

