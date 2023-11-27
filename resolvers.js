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
        let files = await githubRequest(`/repos/${owner}/${repoName}/contents`);
        files = files.filter(item => item.type === 'file');
        const ymlFile = files.find(item => item.name.endsWith('.yml'));
        let yamlContent = '';
        if (ymlFile) {
          const pickedFile = await githubRequest(`/repos/${owner}/${repoName}/contents/${ymlFile.path}`);
          if (pickedFile) {
            yamlContent = Buffer.from(pickedFile.content, 'base64').toString('utf-8');
          }
        }
        let webhooks = await githubRequest(`/repos/${owner}/${repoName}/hooks`);
        webhooks = webhooks.filter(hook => hook.active);
        return {
          name: repo.name,
          size: repo.size,
          owner: repo.owner.login,
          private: repo.private,
          pushed_at: repo.pushed_at,
          numOfFiles: files.length,
          ymlContent: yamlContent,
          activeWebhooks: webhooks.length,
        };
      } catch (error) {
        throw new Error(`Failed to fetch repository details: ${error.message}`);
      }
    },
  },
};

module.exports = resolvers;
