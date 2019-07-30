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

	type MessageQuery {
		list: [Message]
		get(id: ID!): Message
	}
	
	type UserQuery {
		list: [User]
		get(id: ID!): User
	}

	type Query {
		messages: MessageQuery
		users: UserQuery
	}

	type MessageMutation {
		create(input: MessageInput): Message
		update(id: ID!, input: MessageInput): Message
		delete(id: ID!): Message
	}

	type UserMutation {
		create(input: UserInput): User
		update(id: ID!, input: UserInput): User
		delete(id: ID!): User
	}

	type Mutation {
		messages: MessageMutation
		users: UserMutation
	}
`);
