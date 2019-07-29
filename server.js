const express = require('express');
const graphqlHTTP = require('express-graphql');
const { root, schema } = require('./graphql');

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => {
  console.log('Running a GraphQL API server at localhost:4000/graphql');
});