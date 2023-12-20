const MAIN_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';
const GITHUB_AUTH_TOKEN = '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';

const sampleFetcher =async () => {
    try{
        const results = await fetch(MAIN_GRAPHQL_ENDPOINT, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${GITHUB_AUTH_TOKEN}`
            },
            body: JSON.stringify({
              query: `
                  query {
                      viewer {
                          login
                      }
                  }
                `,
              // variables: {
              //   now: new Date().toISOString(),
              // },
            }),
          })
          console.log('success data is here... ', results)
          return results;
    }catch(err){
        console.log('ERROR IS HERE ', err)
    }
   
}


module.exports.handler = async (event) => {
    const data = await sampleFetcher();
    console.log('data is coming through over here... ', data)
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v3.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };
};
