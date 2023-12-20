const GET_UPDATED_RESOURCE =`
    query($owner: String!, $name: String!) {
        repository(owner: $owner, name: $name){
            defaultBranchRef{
                target{
                    oid
                }
            }
        }
    }
`;

const BASE_COMMIT_ON_BRANCH = `
    mutation ($input: CreateCommitOnBranchInput!) {
        createCommitOnBranch(input: $input){
            clientMutationId
            ref{
                target{
                    oid
                }
            }
        }
    }
`;

const LATEST_FILE_CONTENT_QUERY = `
query($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      object(expression: "HEAD:myfile.txt") {
        ... on Blob {
          text
          byteSize
        }
      }
    }
  }`
  module.exports={
    GET_UPDATED_RESOURCE,
    BASE_COMMIT_ON_BRANCH,
    LATEST_FILE_CONTENT_QUERY
  }