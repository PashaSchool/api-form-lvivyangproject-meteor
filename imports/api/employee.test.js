import {Employee} from './employee'
import {Meteor} from 'meteor/meteor'
import expect from 'expect'

if(Meteor.isServer) {
    describe.only('Test "Employee" CRUD ', () => {
        let employee1 = {
            name: "SomeName",
            _id: "3as5d1",
            surname: "SomeSurname",
            thirdname: "SomeThirdName",
            position: "like a boss"
        };
        let employee2 = {
            name: "SomeName",
            surname: "SomeSurname",
            _id: "u3y6",
            thirdname: "SomeThirdName",
            position: "like a boss"
        };
        let employee3 = {
            name: "SomeName",
            surname: "SomeSurname",
            _id: "fha35s4d",
            thirdname: "SomeThirdName",
            position: "like a boss"
        };

        let userId = "someUserId";
        let method = () => {
            return {
                getAll: Meteor.server.method_handlers['employee.getAll'],
                getById: Meteor.server.method_handlers['employee.getById'],
                insert: Meteor.server.method_handlers['employee.insert'],
                delete: Meteor.server.method_handlers['employee.delete'],
                update: Meteor.server.method_handlers['employee.update']
            }
        };

        const m = method();
        
        beforeEach((done) => {

            Promise.all([
                Meteor.server.method_handlers['employee.insert'].call({userId}, employee1),
                Meteor.server.method_handlers['employee.insert'].call({userId}, employee2),
                Meteor.server.method_handlers['employee.insert'].call({userId}, employee3)
            ]).then(() => done());
            
        });

        afterEach((done) => {
            Promise.resolve(Meteor.server.method_handlers['employee.reset'].call({userId}) ).then(() => done()) 
        })

        describe('GET', () => {
            it('should return all employees', (done) => {
                Promise.resolve(m.getAll())
                .then(empl => expect(empl.length).toEqual(3))
                .then(() => done())
            });
    
            it('should return employye by id', (done) => {
                let {_id} = employee2;
                Promise.resolve(m.getById(_id))
                .then((empl) => expect(empl.name).toBe(employee2.name))
                .then(() => done())
            })
        });

        describe("CREATE", () => {
            it("should create new employee", (done) => {
                let newEmployee = {
                    name: "adasd",
                    _id: "asdasd",
                    surname: "asdasd",
                    thirdname: "klja;ls",
                    position: "dsfsdf"
                };

                Promise.resolve(m.insert.call({userId}, newEmployee))
                    .then(() => m.getById(newEmployee._id))
                    .then(employee => expect(employee.name).toBe(newEmployee.name))
                    .then(() => done())
            });

            it('should return validation error', (done) => {
                let newEmployee = {
                    name: "dasdasd"
                };

                return new Promise((resolve, reject) => {
                    m.insert.call({userId}, newEmployee)
                }).catch(e => expect(e.error).toBe("validation error")).then(() => done() ) ;

            });

            it('should return auth error', (done) => {
                let newEmployee = {
                    name: "adasd",
                    _id: "asdasd",
                    surname: "asdasd",
                    thirdname: "klja;ls",
                    position: "dsfsdf"
                };
                return new Promise((resolve, project) => {
                    m.insert.call({}, newEmployee)
                }).catch(e => expect(e.error).toBe("You dont have premission to do that"))
                .then(() => done())
            })
        });
        describe("DELETE", () => {
            it("should successfuly delete employyer from list", (done) => {
                Promise.resolve(m.delete.call({userId}, employee1._id))
                .then(() => m.getAll())
                .then(employees => expect(employees).toExclude(employee1))
                .then(() => done())
            });

            it('should not delete employye withot auth', (done) => {
                return new Promise((resolve, reject) => {
                    m.delete.call({}, employee1._id)
                }).catch(e => expect(e.error).toBe("You dont have premission to do that"))
                .then(() => done())
            });

            it('should return validation error ', (done) => {
                return new Promise((resolve, reject) => {
                    m.delete.call({userId}, 3222)
                }).catch(({error}) => expect(error).toBe("validation error")).then(() => done())
            })
        });

        describe("UPDATE", () => {
            it('should update employee name field', (done) => {
                let name = "Updated name";
                let {_id} = employee1;

                Promise.resolve(m.update.apply({userId},[_id, {name}]))
                .then(() => m.getById(_id))
                .then(employee => expect(employee.name).toBe(name) )
                .then(() => done() )
            })
            it('should return validation error', (done) => {
                let name = "someNewName";
                return new Promise((resolve, reject) => {
                    m.update.apply({userId}, [4234234, {name}])
                }).catch(({error}) => expect(error).toBe("validation error"))
                .then(() => done()) 
            })
            it('should not update employee', (done) => {
                let name = "updatet name";
                let {_id} = employee1;

                return new Promise((resolve,reject) => {
                    m.update.apply(3434, [_id, {name}])
                }).catch(({error}) => expect(error).toBe("You dont have premission to do that"))
                .then(() => done())
            });
            it('should update name and surname', (done) => {
                let updates = {
                    name: "Pasha",
                    surname: "School" 
                };
                let {_id} = employee1;

                Promise.resolve(m.update.apply({userId}, [_id, updates]))
                .then(() => m.getById(_id))
                .then(employee => {
                    let {name, surname} = employee;
                    expect(`${name} ${surname}`).toBe(`${updates.name} ${updates.surname}`);
                }).then(() => done())
            })
        })
        
    })
}

