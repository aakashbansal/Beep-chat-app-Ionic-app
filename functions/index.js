const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.addUserMessages = functions.database.ref(`/messages/{messageId}`)
    .onWrite(event => {

        const messageKey = event.data.key;
        const messageVal = event.data.val();

        const userFromId = messageVal.userFromId;
        const userToId = messageVal.userToId;

        admin.database().ref(`/user-messages/${userFromId}/${userToId}`)
            .child(messageKey).set(1);
        admin.database().ref(`/user-messages/${userToId}/${userFromId}`)
            .child(messageKey).set(1);

    });

exports.addLastMessages = functions.database.ref(`/messages/{messageId}`)
    .onWrite(event => {

        const messageKey = event.data.key;
        const messageVal = event.data.val();

        const userFromId = messageVal.userFromId;
        const userToId = messageVal.userToId;

        admin.database().ref(`/last-messages/${userFromId}/${userToId}`)
            .child('key').set(messageKey);
        admin.database().ref(`/last-messages/${userToId}/${userFromId}`)
            .child(`key`).set(messageKey);

    })