const githubGqlResponseToJsonData = res => {
    if (res.status>=200 && res.status <300) {
      return res.json()
    }else{
      throw new Error();
    }
}
const responseToLatestTextFileContent = (response) => (response 
    && response.data 
    && response.data.repository 
    && response.data.repository.object 
    &&response.data.repository.object.text) || '';

const currentFileContentToUpdatedFileContent = (currentFileContent) => 
    `${currentFileContent}\n${new Date().toString()}`
const generateUpdatedFileVariables = (githubUserName, githubRepoName, lastCommitOid, fileContent) => {
    return {
        branch: {
            repositoryNameWithOwner: `${githubUserName}/${githubRepoName}`,
            branchName: "main"
        }, 
        expectedHeadOid: lastCommitOid, 
        fileChanges: {
            additions: [
            {
                path: "myfile.txt",
                contents: Buffer.from(fileContent).toString('base64')
            }
            ]
        },
        message: {
            body: "BODY - Genie in da bottle, made the change",
            headline: "HEAD LINE - Genie in da bottle, made the change"
        }
    }
}
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
module.exports ={
    githubGqlResponseToJsonData,
    responseToLatestTextFileContent,
    currentFileContentToUpdatedFileContent,
    generateUpdatedFileVariables,
    randomIntFromInterval
}