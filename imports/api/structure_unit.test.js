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
        resetDb: Meteor.server.method_handlers['branch.reset']
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
                sub_lmr_structure_title: "Sub title",
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
                    sub_lmr_structure_title: "Sub title",
                    description: "Description",
                    a_part_of: ["a part of id"],
                    medium_upper_structure: ["medium_upper_structure"],
                    hight_upper_structure: ["hight_upper_structure"],
                    employees: [{}]
                },
                {
                    sub_lmr_structure_title: "Sub title",
                    description: "Description",
                    a_part_of: ["a part of id"],
                    medium_upper_structure: ["medium_upper_structure"],
                    hight_upper_structure: ["hight_upper_structure"],
                    employees: [{}]
                }
            ]
        };
        let branch3 = {
            title: "Управління",
            order: 3,
            _id: '23er544',
            lmr_structure_units: [{
                    sub_lmr_structure_title: "Управлінна господарством",
                    description: "Description",
                    a_part_of: ["a part of id"],
                    medium_upper_structure: ["medium_upper_structure"],
                    hight_upper_structure: ["hight_upper_structure"],
                    employees: [{}]
                },
                {
                    sub_lmr_structure_title: "Sub title",
                    description: "Description",
                    a_part_of: ["a part of id"],
                    medium_upper_structure: ["medium_upper_structure"],
                    hight_upper_structure: ["hight_upper_structure"],
                    employees: [{}]
                }
            ]
        };

        let newStrData = {
            sub_lmr_structure_title: "SUB",
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
        describe("CREATE Structure", () => {
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
        describe("GET Structure", () => {
            it('should return structure by ID', () => {
                let title = branch3.lmr_structure_units[0].sub_lmr_structure_title;
                console.log(title);
                Promise.resolve(m.getStructureByTitle(title))
                    .then(result => console.log(result))
            })
        })

    })
}