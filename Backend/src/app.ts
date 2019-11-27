const express = require('express');
const cors = require('cors');
const { ApolloServer, gql } = require('apollo-server-express');
import { typeDefs, resolvers } from './schema';

/***********************************************************************************************/
////////////////////////////////////////// APP STARTS HERE /////////////////////////////////////
/******************************************************************************************** */
/** Express Section */
const app = express();
app.use(cors());
app.get('/', function (req, res) {
  res.send('Hello Baby');
});


const server = new ApolloServer({
  // These will be defined for both new or existing servers
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app }); // app is from an existing express app

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)


