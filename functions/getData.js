const axios = require('axios')

exports.handler = function(event, context, callback) {

  // Gets searchTerm from axios request in App.js
  const word = event.queryStringParameters.searchTerm,

  // Sets auth headers for API request. REACT_APP_WORDS_API_KEY 
  // must be added to Netlify
  headers = {
    "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
    "x-rapidapi-key": process.env.REACT_APP_WORDS_API_KEY
  },

  // Fixes CORS issue in development
  devHeaders = {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  },

  // Sets up API endpoints
  rhymesURL        = `https://wordsapiv1.p.rapidapi.com/words/${word}/rhymes`,
  synonymsURL      = `https://wordsapiv1.p.rapidapi.com/words/${word}/synonyms`,
  similarToURL     = `https://wordsapiv1.p.rapidapi.com/words/${word}/similarTo`,

  // Sets up axios promises
  rhymesRequest    = axios.get(rhymesURL,    { headers }),
  synonymsRequest  = axios.get(synonymsURL,  { headers }),
  similarToRequest = axios.get(similarToURL, { headers })

  // Sends results to front end. Accessed by App.js getData url 
  const send = body => {
    callback(null, {
      statusCode: 200,
      // uncomment in dev environment
      // headers: devHeaders,
      body: JSON.stringify(body)
    })
  }

  const getData = () => {
    // Waits for all axios promises to return
    Promise.all([rhymesRequest, synonymsRequest, similarToRequest])
      .then((responses) => {

        // Sets response object to be sent to front end
        let data = {
          synonyms: responses[1].data.synonyms,
          similarTo: responses[2].data.similarTo,
        }

        // Adds rhymes object if rhymes exist. Otherwise sets rhymes to
        // empty array
        if (responses[0].data.rhymes.all) {
          data = {
            ...data,
            rhymes: responses[0].data.rhymes.all
          }
        } else {
          data = {
            ...data,
            rhymes: []
          }
        }

        // Sends data to front end
        send(data)

      })
      .catch(err => {
        // If error or no results from API
        send({"error": true})
      })
  }

  // Calls function if a GET request is made to front end endpoint
  if(event.httpMethod === 'GET') {
    getData()
  }

}