const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
	input MessageInput {
		content: String
		author: String
	}

	type Message {
		id: ID!
		content: String
		author: String
	}

	type Query {
    getMessages: [Message]
		getMessage(id: ID!): Message
	}

	type Mutation {
		createMessage(input: MessageInput): Message
		updateMessage(id: ID!, input: MessageInput): Message
	}
`);

class Message {
  constructor(id, {content, author}) {
    this.id = id;
    this.content = content;
    this.author = author;
  }
}

// Maps username to content
var fakeDatabase = {};

var root = {
  getMessages: function() {
    const messages = [];
    for(let a in fakeDatabase) {
      messages.push(new Message(a, fakeDatabase[a]));
    }
    return messages;
  },
  getMessage: function ({id}) {
    if (!fakeDatabase[id]) {
      throw new Error('no message exists with id ' + id);
    }
    return new Message(id, fakeDatabase[id]);
  },
  createMessage: function ({input}) {
    // Create a random id for our "database".
    var id = require('crypto').randomBytes(10).toString('hex');

    fakeDatabase[id] = input;
    return new Message(id, input);
  },
  updateMessage: function ({id, input}) {
    if (!fakeDatabase[id]) {
      throw new Error('no message exists with id ' + id);
    }
    // This replaces all old data, but some apps might want partial update.
    fakeDatabase[id] = input;
    return new Message(id, input);
  },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => {
  console.log('Running a GraphQL API server at localhost:4000/graphql');
});