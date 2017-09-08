import expect from 'expect'
import { Branch } from './branch.js'
import { Meteor } from 'meteor/meteor'


const reduceStructure = (acumulator, value) => {
    value.lmr_structure_units.forEach(obj => acumulator.push(obj));
    return acumulator
};

const methods = () => {
    return {
        getAll: Meteor.server.method_handlers['branch.getAll'],
        addBranch: Meteor.server.method_handlers['branch.insert'],
        addStructure: Meteor.server.method_handlers['branch.addUnitStructure'],
        getStructureByTitle: Meteor.server.method_handlers['branch.getStructureById'],
        resetDb: Meteor.server.method_handlers['branch.reset'],
        updateStrucutre: Meteor.server.method_handlers['branch.updateStrucutre'],
        deleteStructure: Meteor.server.method_handlers['branch.deleteStructure']
    }
};
const m = methods();

if (Meteor.isServer) {
    describe('Structure Units', function() {
        let branch1 = {
            title: "Заступники міського голови",
            order: 1,
            _id: '4r4322',
            lmr_structure_units: [{
                title: "Sub title",
                strId: "asd",
                description: "Description",
                a_part_of: ["a part of id"],
                medium_upper_structure: ["medium_upper_structure"],
                hight_upper_structure: ["hight_upper_structure"],
                employees: [{}]
            }]
        };
        let branch2 = {
            title: "Департаменти",
            order: 2,
            _id: 'h6hd433',
            lmr_structure_units: [{
                title: "Sub title",
                strId: "43fq",
                description: "Description",
                a_part_of: ["a part of id"],
                medium_upper_structure: ["medium_upper_structure"],
                hight_upper_structure: ["hight_upper_structure"],
                employees: [{}]
            }]
        };
        let branch3 = {
            title: "Управління",
            order: 3,
            _id: '23er544',
            lmr_structure_units: [{
                title: "Управлінна господарством",
                strId: "dasdq",
                description: "Description sad",
                a_part_of: ["a part of id"],
                medium_upper_structure: ["medium_upper_structure"],
                hight_upper_structure: ["hight_upper_structure"],
                employees: [{}]
            },
            {
                title: "Уasdрством",
                strId: "1a3sd",
                description: "Description",
                a_part_of: ["a part of id"],
                medium_upper_structure: ["medium_upper_structure"],
                hight_upper_structure: ["hight_upper_structure"],
                employees: [{}]
            }]
        };

        let newStrData = {
            title: "SUB",
            strId: "afshy65",
            description: "DESC",
            a_part_of: ["a part of id"],
            medium_upper_structure: ["medium_upper_structure"],
            hight_upper_structure: ["hight_upper_structure"],
            employees: [{}]
        };

        let userId = '123';
        let lengthOfStructureUnits;


        beforeEach(function(done) {
            Promise.all([
                    m.addBranch.call({ userId }, branch1),
                    m.addBranch.call({ userId }, branch2),
                    m.addBranch.call({ userId }, branch3)
                ])
                .then(() => m.getAll())
                .then(branches => branches.reduce(reduceStructure, []))
                .then(reducedData => lengthOfStructureUnits = reducedData.length)
                .then(() => done());
        });

        afterEach(function(done) {
            Promise.resolve(m.resetDb()).then(() => done());
        });
        describe("CREATE ", () => {
            it('should return greater length of structure units then before', function(done) {

                Promise.resolve(m.addStructure.apply({ userId }, [branch3._id, newStrData]))
                    .then(() => m.getAll())
                    .then((result) => result.reduce(reduceStructure, []))
                    .then(reduceData => expect(reduceData.length).toBeGreaterThan(lengthOfStructureUnits))
                    .then(() => done())

            });

            it('should not create a new Structure', function(done) {
                return new Promise((resolve, reject) => {
                        m.addStructure(branch1._id, newStrData)
                    }).catch(e => expect(e).toIncludeKey('error'))
                    .then(() => done())
            });
        });
        describe("GET ", () => {
            it('should return structure by ID', () => {
                let title = branch3.lmr_structure_units[0].title;

                Promise.resolve(m.getStructureByTitle(branch3._id, title))
                    // .then(result => console.log(result))
                    .then(() => done())
            });

            it('should return all Structures in collection', () => {

            });
        });
        describe("UPDATE", () => {

            it('should update structure title', (done) => {
                let {strId} = branch3.lmr_structure_units[0];
                let {_id} = branch3;
                let updates = {title: "Updated title"};

                Promise.resolve( m.updateStrucutre.apply({userId},[_id, strId, updates]))
                .then(() => m.getAll())
                .then(result => result.reduce(reducer, []).filter(x => x.strId === strId) )
                .then(res => expect(res[0].title).toBe(updates.title))
                .then(() => done())
               
            });
            it('should update description in structure', (done) => {
                let {strId} = branch3.lmr_structure_units[0];
                let {_id} = branch3;
                let updates = {
                    title: branch3.title,
                    description: "Some new description"
                };
                
                Promise.resolve( m.updateStrucutre.apply({userId},[_id, strId, updates]))
                .then(() => m.getAll())
                .then(result => result.reduce(reducer, []).filter(x => x.strId === strId) )
                .then(res => expect(res[0].description).toBe(updates.description))
                .then(() => done())

            });
            it('should not update any fields', (done) => {
                let {strId} = branch3.lmr_structure_units[0];
                let {_id} = branch3;
                let updates = {
                    title: branch3.title,
                    description: "Some new description"
                };

                Promise.resolve(
                    expect(() => {
                        return m.updateStrucutre.apply(null, [_id, strId, updates]);
                    }).toThrow() 
                ).then(() => done())
                
            });

            describe("DELETE ", () => {
                let deletedStructure = branch3.lmr_structure_units[1]; 
                it("should delete structure", (done) => {
                    Promise.resolve(m.deleteStructure.apply({userId},[branch3._id, "1a3sd"]))
                        .then(() => m.getAll())
                        .then(res => res.reduce(reducer, []))
                        .then(res => expect(res).toExclude(deletedStructure))
                        .then(() => done());
                });
                it("should not delete structure", () => {
                    Promise.resolve(
                            expect(() => {
                                m.deleteStructure.apply({}, [branch3._id, "1a3sd"])
                            }).toThrow()
                        ).then(() => done());
                })
            });

        })

    })
}

function reducer(acumulator, branch) {
    branch.lmr_structure_units.forEach((obj) => {
        acumulator.push(obj)
    });
    return acumulator
}