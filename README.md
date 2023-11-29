# GraphQL Server with GitHub Integration

This repository contains a GraphQL server that leverages the Apollo Server library to interact with the GitHub API. The server provides two main queries for fetching information about GitHub repositories.

# Installation
  1. Clone the repository from console:
        git clone https://github.com/ABDULJAMAL/githubScanner.git
  2. execute the following command from console to Install dependencies:
        npm install 

# Usage
To run the GraphQL server, execute the following command:
    node app.js

This will start the server, and you can access the GraphQL Playground at the provided URL (default is http://localhost:4000/). Use the Playground to test and explore the available queries.

# GraphQL Schema
The GraphQL schema is defined in the schema.js file. It specifies the available queries and their return types.

// Import the GraphQL schema
    const typeDefs = require("./schema");

# Resolvers
Resolver functions handle the execution of GraphQL queries. They are responsible for fetching and returning the requested data.

// Import resolver functions
    const resolvers = require("./resolvers");

// Apollo Server instance with schema and resolvers
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        cors: {
            origin: '*',
            methods: 'POST',
        },
    });
# Queries
  1. listRepositories
    This query fetches a list of repositories associated with the authenticated GitHub user.
        
        query {
            listRepositories {
                name
                size
                owner
                private
            }
        }

        name: The name of the repository.
        size: The size of the repository.
        owner: The login name of the repository owner.
        private: Indicates if the repository is private.

  2. getRepoDetails
        This query fetches detailed information about a specific repository, including the number of files, YAML file content, and active webhooks.

        query {
            getRepoDetails(owner: "ownerName", repoName: "repositoryName") {
                name
                size
                owner
                private
                pushed_at
                numOfFiles
                ymlContent
                activeWebhooks
            }
        }

        name: The name of the repository.
        size: The size of the repository.
        owner: The login name of the repository owner.
        private: Indicates if the repository is private.
        pushed_at: The timestamp when the repository was last pushed to.
        numOfFiles: The number of files in the repository.
        ymlContent: The content of the YAML file if present.
        activeWebhooks: The number of active webhooks for the repository.

# GitHub API Integration
The gitHubCalls.js module contains a utility function, githubRequest, for making requests to the GitHub API. The main resolver file (resolvers.js) utilizes this function to fetch information about repositories.

    const { githubRequest } = require("./gitHubCalls");

# Error Handling
Errors that occur during GitHub API requests or GraphQL query execution are caught and thrown with descriptive messages.

    try {
        // GraphQL query execution
    } catch (error) {
        console.error(error.message);
    }

Make sure to implement proper error handling in GraphQL server implementation to handle these errors gracefully.