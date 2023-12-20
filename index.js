require('dotenv').config()
const { setNewCommitOnBranchWithRecentCommitOid, getMostRecentCommitOID, getAndUpdateFileContent } = require('./shared/services');
const { generateUpdatedFileVariables } = require('./shared/transformations');

const GITHUB_AUTH_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
const GITHUB_USER_NAME = process.env.GITHUB_USER_NAME;
const GITHUB_REPO_NAME = process.env.GITHUB_REPO_NAME;


module.exports.handler = async (event) => {
    const recentCommitOid = await getMostRecentCommitOID(GITHUB_USER_NAME, GITHUB_REPO_NAME,GITHUB_AUTH_TOKEN);
    const updatedFileContent = await getAndUpdateFileContent(GITHUB_USER_NAME, GITHUB_REPO_NAME, GITHUB_AUTH_TOKEN);
    const response = await setNewCommitOnBranchWithRecentCommitOid(
        generateUpdatedFileVariables(
            GITHUB_USER_NAME, 
            GITHUB_REPO_NAME, 
            recentCommitOid, 
            updatedFileContent
            ),
            GITHUB_AUTH_TOKEN
        )

    return {
        statusCode: 200,
        body: JSON.stringify(
        {
            message: 'Genie is back in the bottle...',
            input: event,
            response: response
        },
        null,
        2
        ),
    };
};
