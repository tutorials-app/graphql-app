const Model = require('../models')

// Maps username to content
const database = {
    messages: {},
    users: {},
};

module.exports = {
    list({model}) {
        const docs = [];
        const collection = database[model + 's'];
        for (let id in collection) {
            docs.push(new Model[model](id, collection[id]));
        }
        return docs;
    },
    get({model, id}) {
        const collection = database[model + 's'];
        if (!collection[id]) {
            throw new Error('no document exists with id ' + id);
        }
        return new Model[model](id, collection[id]);
    },
    create({model, input}) {
        const id = require('crypto').randomBytes(10).toString('hex');

        database[model + 's'][id] = input;
        return new Model[model](id, input);
    }
};

function crud(Model, state) {
    return {
        get: function () {
            const collection = database[state];
            if (!collection[id]) {
                throw new Error('no document exists with id ' + id);
            }
            return new Model(id, collection[id]);
        },
        list: function () {
            const docs = [];
            const collection = database[state];
            for (let id in collection) {
                docs.push(new Model(id, collection[id]));
            }
            return docs;
        },
        create: function ({ input }) {
            var id = require('crypto').randomBytes(10).toString('hex');

            database[state][id] = input;
            return new Model(id, input);
        },
        update: function ({ id, input }) {
            if (!database[state][id]) {
                throw new Error('no document exists with id ' + id);
            }
            // This replaces all old data, but some apps might want partial update.
            database[state][id] = input;
            return new Model(id, input);
        },
        delete: function () {
            if (!database[state][id]) {
                throw new Error('no document exists with id ' + id);
            }
            // This replaces all old data, but some apps might want partial update.
            const doc = clone(database[state][id]);

            database[state][id] = undefined;
            return new Model(id, doc);
        }
    }
}

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    const copy = obj.constructor();
    for (let attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}