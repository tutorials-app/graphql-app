const Model = require('../models')

// Maps username to content
const database = {
    messages: {},
    users: {},
};

module.exports = {
    messages: crud(Model['message'], database['messages']),
    users: crud(Model['user'], database['users'])
};

function crud(Model, collection) {
    return {
        get({id}) {
            if (!collection[id]) {
                throw new Error('no document exists with id ' + id);
            }
            return new Model(id, collection[id]);
        },
        list() {
            const docs = [];
            for (let id in collection) {
                docs.push(new Model(id, collection[id]));
            }
            return docs;
        },
        create ({ input }) {
            var id = require('crypto').randomBytes(10).toString('hex');

            collection[id] = input;
            return new Model(id, input);
        },
        update ({ id, input }) {
            if (!collection[id]) {
                throw new Error('no document exists with id ' + id);
            }
            // This replaces all old data, but some apps might want partial update.
            collection[id] = input;
            return new Model(id, input);
        },
        delete ({id}) {
            if (!collection[id]) {
                throw new Error('no document exists with id ' + id);
            }
            // This replaces all old data, but some apps might want partial update.
            const doc = clone(collection[id]);

            delete collection[id];
            return new Model(id, doc);
        }
    }
}

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    const copy = {};
    for (let attr in obj) {
        copy[attr] = obj[attr];
    }
    return copy;
}