import expect from 'expect'
import { Branch } from './branch.js'
import { Meteor } from 'meteor/meteor'

const methods = () => {
    return {
        getAll: Meteor.server.method_handlers['branch.getAll'],
        getById: Meteor.server.method_handlers['employee.getById'],
        addBranch: Meteor.server.method_handlers['branch.insert'],
        addStructure: Meteor.server.method_handlers['branch.addUnitStructure'],
        getStructureByTitle: Meteor.server.method_handlers['branch.getStructureById'],
        resetDb: Meteor.server.method_handlers['branch.reset'],
        updateStrucutre: Meteor.server.method_handlers['branch.updateStrucutre'],
        deleteStructure: Meteor.server.method_handlers['branch.deleteStructure'],
        getStrWithEmp: Meteor.server.method_handlers['branch.showStructuresWithEmployee'],
        insert: Meteor.server.method_handlers['employee.insert'],
        
    }
};

const m = methods();

if(Meteor.isServer) {
    describe("Releted to Employee from Structures", () => {
        let branch1 = {
            title: "Заступники міського голови",
            order: 1,
            _id: '4r4322',
            lmr_structure_units: [{
                title: "hot title",
                strId: "asd",
                description: "Description",
                a_part_of: ["a part of id"],
                medium_upper_structure: ["medium_upper_structure"],
                hight_upper_structure: ["hight_upper_structure"],
                employees: ["3as5d1", "lukih43"]
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
                employees: ["3as5d1", "lukih43"]
            }]
        };
        let branch3 = {
            title: "Департаменти branch3",
            order: 2,
            _id: '4r4ycv',
            lmr_structure_units: [{
                title: "Sub title",
                strId: "a36sd4",
                description: "Description",
                a_part_of: ["a part of id"],
                medium_upper_structure: ["medium_upper_structure"],
                hight_upper_structure: ["hight_upper_structure"],
                employees: ["3as5d1"]
            }]
        };

        let employee1 = {
            name: "SomeName",
            _id: "3as5d1",
            surname: "SomeSurname",
            thirdname: "SomeThirdName",
            position: "like a boss"
        };
        let employee2 = {
            name: "SomeName",
            _id: "lukih43",
            surname: "SomeSurname",
            thirdname: "SomeThirdName",
            position: "like a boss"
        };
        
        let userId = "4234234";

        beforeEach(function(done) {
            Promise.all([
                    m.addBranch.call({ userId }, branch1),
                    m.addBranch.call({ userId }, branch2),
                    m.addBranch.call({ userId }, branch3),
                    m.insert.call({ userId }, employee1),
                    m.insert.call( { userId }, employee2)
                ])
                .then(() => done());
        });

        afterEach(function(done) {
            Promise.all([
                Meteor.server.method_handlers['employee.reset'].call({userId}),
                m.resetDb()
            ]).then(() => done())
        });

        // it('should return all releted employee from structure', () => {
        //     Promise.resolve(m.getStrWithEmp())
        //     .then((res) => console.log('res ', formate(res) ))
        // });
        // it('should return all employees for str', (done) => {
        //     Promise.resolve(m.getStructureByTitle(branch1._id, "hot title"))
        //     .then(structure => console.log(structure))
        //     .then(() => done())
        // })
       
    })
}


function formate(obj) {
    return JSON.stringify(obj, null, 2)
}



// var branch1 = {
//     title: "Заступники міського голови",
//     order: 1,
//     _id: '4r4322',
//     lmr_structure_units: [{
//         title: "Sub title from branch 1",
//         strId: "asd",
//         description: "Description",
//         a_part_of: ["a part of id"],
//         medium_upper_structure: ["medium_upper_structure"],
//         hight_upper_structure: ["hight_upper_structure"],
//         employees: ["3as5d1", "lukih43"]
//     }]
// };
// var branch2 = {
//     title: "Департаменти",
//     order: 2,
//     _id: 'h6hd433',
//     lmr_structure_units: [{
//         title: "Sub title",
//         strId: "43fq",
//         description: "Description",
//         a_part_of: ["a part of id"],
//         medium_upper_structure: ["medium_upper_structure"],
//         hight_upper_structure: ["hight_upper_structure"],
//         employees: ["3as5d1"]
//     }]
// };
// var employee1 = {
//     name: "SomeName",
//     _id: "3as5d1",
//     surname: "SomeSurname",
//     thirdname: "SomeThirdName",
//     position: "like a boss"
// };
// var employee2 = {
//     name: "SomeName",
//     _id: "lukih43",
//     surname: "SomeSurname",
//     thirdname: "SomeThirdName",
//     position: "like a boss"
// };
// var Branch = [branch1, branch2];
// var Employee = [employee1, employee2];

// function returnEmployeeById(_id) {
//     let emloyee = [...Employee];
//     function showById() {
//         return emloyee.filter(empl => empl._id.toString() === _id.toString())
//     }
//     return showById();
// }

// function reducer(acumulator, object) {

//     acumulator.push({
//         title: object.title,
//         lmr_structure_units: object.lmr_structure_units.reduce(reduceStr,[])
//     });
//     return acumulator
// }

// function reduceStr(array, struct){
//     let nice = struct.employees.map(id => returnEmployeeById(id)); //new array
//     struct.employees = null;
    
//     array.push({
//         ...struct,
//         employees: [...nice]

//     })
//     return array
// }

// var b = Branch.reduce(reducer, []);
// console.log( JSON.stringify(b, null, 2));

    // var olala = object.lmr_structure_units.forEach((res) => {
    //     return res.employees.map((_id) => returnEmployeeById(_id))
    // });
    // console.log(olala)

// var arr = [{
//     name: "Pasha",
//     count: [4, 32]
// }, {
//     name: "Oleg",
//     count: [12, 32]
// }];

// arr.reduce((acu, val) => {
    
//    var newQ = val.count.map(num => num + 2);

//     acu.push({
//         ...val,
//         count: val.count.map(num => num + 2)
//     });

//     return acu
// }, [])


