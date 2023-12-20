const fetch = require('node-fetch');
const { githubGqlResponseToJsonData, currentFileContentToUpdatedFileContent, responseToLatestTextFileContent } = require("./transformations")
const {
    GET_UPDATED_RESOURCE,
    BASE_COMMIT_ON_BRANCH,
    LATEST_FILE_CONTENT_QUERY
    } = require('./queries')

const MAIN_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';


const githubGqlBodyToFetchData = async (body, githubAuthToken) => {
   return await fetch(MAIN_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${githubAuthToken}`
        },
        body: JSON.stringify(body)
    }).then(githubGqlResponseToJsonData)
}
const getMostRecentCommitOID =async (githubUserName,githubRepoName,githubAuthToken) => {
    try{
        const results =await githubGqlBodyToFetchData({
        query: GET_UPDATED_RESOURCE,
        variables:{
            owner:githubUserName, 
            name:githubRepoName
        }
        }, githubAuthToken)
        return results.data.repository.defaultBranchRef.target.oid
    }catch(err){
        console.log('ERROR Fetching Recent OID ', err)
        return null
    }
   
}

const setNewCommitOnBranchWithRecentCommitOid = async (input, githubAuthToken) => {
    try{
        return await githubGqlBodyToFetchData({
            query: BASE_COMMIT_ON_BRANCH,
            variables: {
                input
            }
        },githubAuthToken)
    }catch(err){
        console.log('ERROR committing ', err)
    }
}
const getLatestFileContent = async (githubUserName,githubRepoName,githubAuthToken) => {
    try{
        const response = await githubGqlBodyToFetchData({
            query: LATEST_FILE_CONTENT_QUERY,
            variables:{
                owner: githubUserName, 
                name: githubRepoName
            }
        },githubAuthToken)
        return responseToLatestTextFileContent(response)
    }catch(err){
        return err
    }
    }
const getAndUpdateFileContent = async (githubUserName,githubRepoName,githubAuthToken) => 
    currentFileContentToUpdatedFileContent(await getLatestFileContent(githubUserName,githubRepoName,githubAuthToken))


module.exports = {
    githubGqlBodyToFetchData,
    getMostRecentCommitOID,
    setNewCommitOnBranchWithRecentCommitOid,
    getLatestFileContent,
    getAndUpdateFileContent
}