require('dotenv').config()
const { setNewCommitOnBranchWithRecentCommitOid, getMostRecentCommitOID, getAndUpdateFileContent } = require('./shared/services');
const { generateUpdatedFileVariables, currentFileContentToUpdatedFileContent, randomIntFromInterval } = require('./shared/transformations');

const GITHUB_AUTH_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
const GITHUB_USER_NAME = process.env.GITHUB_USER_NAME;
const GITHUB_REPO_NAME = process.env.GITHUB_REPO_NAME;


module.exports.handler = async (event) => {
    let recentCommitOid = await getMostRecentCommitOID(GITHUB_USER_NAME, GITHUB_REPO_NAME,GITHUB_AUTH_TOKEN);
    let updatedFileContent = await getAndUpdateFileContent(GITHUB_USER_NAME, GITHUB_REPO_NAME, GITHUB_AUTH_TOKEN);

    const howManyCommitsToMake = randomIntFromInterval(1, 7)
    console.log('iterations...', howManyCommitsToMake)

    for(let i = 0; i < howManyCommitsToMake; i++){
        console.log('Last Commit ID', recentCommitOid)
        const response = await setNewCommitOnBranchWithRecentCommitOid(
            generateUpdatedFileVariables(
                GITHUB_USER_NAME, 
                GITHUB_REPO_NAME, 
                recentCommitOid, 
                updatedFileContent
                ),
                GITHUB_AUTH_TOKEN
            )
        recentCommitOid = response.data.createCommitOnBranch.ref.target.oid
        updatedFileContent = currentFileContentToUpdatedFileContent(updatedFileContent)
    }

    return {
        statusCode: 200,
        body: JSON.stringify(
        {
            message: 'Genie is back in the bottle...',
        },
        null,
        2
        ),
    };
};
