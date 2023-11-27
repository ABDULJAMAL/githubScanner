const { githubRequest } = require("./gitHubCalls")
const resolvers = {
  Query: {
    listRepositories: async () => {
      try {
        const repositories = await githubRequest('/user/repos');
        return repositories.map((repo) => ({
          name: repo.name,
          size: repo.size,
          owner: repo.owner.login,
          private: repo.private,
        }));
      } catch (error) {
        throw new Error(`Failed to fetch repositories: ${error.message}`);
      }
    },
    getRepoDetails: async (_, { owner, repoName }) => {
      try {
        const repo = await githubRequest(`/repos/${owner}/${repoName}`);
        return {
          name: repo.name,
          size: repo.size,
          owner: repo.owner.login,
          private: repo.private,
          pushed_at: repo.pushed_at,
          numOfFiles: 0, // Not Sure What is the key
          ymlContent: '', // Not Sure What is the key
          activeWebhooks: 0, // Not Sure What is the key
        };
      } catch (error) {
        throw new Error(`Failed to fetch repository details: ${error.message}`);
      }
    },
  },
};

module.exports = resolvers;
