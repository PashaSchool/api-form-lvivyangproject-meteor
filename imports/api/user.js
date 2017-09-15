import {SimpleSchema} from 'meteor/aldeed:simple-schema'
import {Accounts} from 'meteor/accounts-base'
import {Meteor} from 'meteor/meteor'

Accounts.validateNewUser((user) => {
   
    const email = user.emails[0].address;
    try {

        new SimpleSchema({
            email: {
                type: String,
                regEx: SimpleSchema.RegEx.Email
            }
        }).validate({email});

    } catch (e) {
        throw new Meteor.Error(403, 'there is invalid email adress')
    }

    return true
})