import { Meteor } from 'meteor/meteor';
import { Branch } from '../imports/api/branch.js'
import { Restivus } from 'meteor/nimble:restivus'

if (Meteor.isServer) {
    const API = new Restivus({
        useDefaultAuth: false,
        enableCors: true,
        prettyJson: true,
        defaultHeaders: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
        }
    });

    API.addCollection(Branch);

    API.addRoute('branches', { authRequired: false }, {
        get: {
            action() {
                return {
                    body: {
                        data: Meteor.call('branch.getAll'),
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'GET',
                            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
                        }
                    }
                }
            }
        }
    }); //get all branches

    API.addRoute('branches/employees', { authRequired: false }, {
        get: {
            action() {
                return { data: Meteor.call('employee.getAll') }
            }
        }
    }); // update and delete some branches
};
