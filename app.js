const { ApolloServer } = require('apollo-server');

// GraphQL schema
const typeDefs = require("./schema")

// Resolver functions
const resolvers = require("./resolvers")

// Apollo Server instance 
const server = new ApolloServer({
    typeDefs,
    resolvers,
    cors: {
        origin: '*',
        methods: 'POST',
    },
});

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
