const axios = require('axios')

exports.handler = function(event, context, callback) {

  const word = event.queryStringParameters.searchTerm,

  headers = {
    "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
    "x-rapidapi-key": process.env.REACT_APP_WORDS_API_KEY
  },

  devHeaders = {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  },

  rhymesURL        = `https://wordsapiv1.p.rapidapi.com/words/${word}/rhymes`,
  synonymsURL      = `https://wordsapiv1.p.rapidapi.com/words/${word}/synonyms`,
  similarToURL     = `https://wordsapiv1.p.rapidapi.com/words/${word}/similarTo`,

  rhymesRequest    = axios.get(rhymesURL,    { headers }),
  synonymsRequest  = axios.get(synonymsURL,  { headers }),
  similarToRequest = axios.get(similarToURL, { headers })

  const send = body => {
    callback(null, {
      statusCode: 200,
      // headers: devHeaders,
      body: JSON.stringify(body)
    })
  }

  const getData = () => {
    Promise.all([rhymesRequest, synonymsRequest, similarToRequest])
      .then((responses) => {

        let arr = {
          synonyms: responses[1].data.synonyms,
          similarTo: responses[2].data.similarTo,
        }

        if (responses[0].data.rhymes.all) {
          arr = {
            ...arr,
            rhymes: responses[0].data.rhymes.all
          }
        } else {
          arr = {
            ...arr,
            rhymes: []
          }
        }

        send(arr)

      })
      .catch(err => {
        send({"error": true})
      })
  }

  if(event.httpMethod === 'GET') {
    getData()
  }

}