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