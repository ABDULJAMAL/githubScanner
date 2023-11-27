const { gql } = require('apollo-server');
const typeDefs = gql`
  type Repository {
    name: String
    size: Int
    owner: String
    private: Boolean
  }

  type RepoDetails {
    name: String
    size: Int
    owner: String
    private: Boolean
    pushed_at: String
    numOfFiles: Int
    ymlContent: String
    activeWebhooks: Int
  }

  type Query {
    listRepositories: [Repository]
    getRepoDetails(owner: String!, repoName: String!): RepoDetails
  }`;

module.exports = typeDefs;