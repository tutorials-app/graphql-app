const { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
module.exports = buildSchema(`
	type User {
		id: ID!
		username: String
		email: String
    }
    type Message {
		id: ID!
		content: String
		author: String
	}

	input MessageInput {
		author: String
		content: String
	}
	input UserInput {
		username: String
		email: String
	}

	union ResultType = User | Message

	type Query {
		list(model: String!): [Message]
		get(model: String!, id: ID!): Message
	}

	type Mutation {
		create(model: String!,input: MessageInput): Message
		update(model: String!, id: ID!, input: MessageInput): Message
	}
`);
