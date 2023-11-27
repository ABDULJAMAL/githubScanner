const axios = require('axios');

var GITHUB_TOKEN = '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';
var GITHUB_API_BASE_URL = 'https://api.github.com';

const githubRequest = async (path) => {
    try {
        const response = await axios.get(`${GITHUB_API_BASE_URL}${path}`, {
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(`GitHub API request failed: ${error.message}`);
    }
};
module.exports = { githubRequest };