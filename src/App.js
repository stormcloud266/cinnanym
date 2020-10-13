import React, {useState} from 'react'
import './App.css'
import axios from 'axios'

function App() {
  // https://wordsapiv1.p.rapidapi.com/words/bloody/similarTo
  // https://wordsapiv1.p.rapidapi.com/words/lovely/synonyms
  // https://wordsapiv1.p.rapidapi.com/words/word/rhymes

  const [state, setState] = useState({
    rhymes: [],
    synonyms: [],
    similarTo: []
  })

  const submitSearch = (e) => {
    e.preventDefault()
    const word = e.target.search.value
    handleGetData(word)
  }

  const handleGetData = (word) => {
    getData(word, 'synonyms')
    getData(word, 'similarTo')
    getData(word, 'rhymes')
  }

  const headers = {
    "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
    "x-rapidapi-key": process.env.REACT_APP_WORDS_API_KEY
  }

  const getData = (word, searchType) => {
    axios.get(`https://wordsapiv1.p.rapidapi.com/words/${word}/${searchType}`, { headers })
      .then(res => {

        let arr
        
        if (searchType === 'rhymes' && res.data.rhymes.all) {
          arr = res.data.rhymes.all
        } else if (searchType === 'rhymes') {
          arr = []
        } else {
          arr = res.data[searchType]
        }

        setState(prevState => ({
          ...prevState,
          [searchType]: arr
        }));
        
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Cinnanym</h1>
      </header>

        <form onSubmit={submitSearch}>
          <input type="text" name="search"/>
          <button>search</button>
        </form>

        <div className="flex">

          <div className="section">
            <h3>Synonyms</h3>
            <ul>
              {
                state.synonyms.length > 0 && state.synonyms.map((word, i) => (
                  <li key={i}>
                    <button onClick={() => handleGetData(word)}>{word}</button>
                  </li>
                ))
              }
            </ul>
          </div>

          <div className="section">
            <h3>Similar</h3>
            <ul>
              {
                state.similarTo.length > 0 && state.similarTo.map((word, i) => (
                  <li key={i}>
                    <button onClick={() => handleGetData(word)}>{word}</button>
                  </li>
                ))
              }
            </ul>
          </div>

          <div className="section">
            <h3>Rhymes</h3>
            <ul>
              {
                state.rhymes.length > 0 && state.rhymes.map((word, i) => (
                  <li key={i}>
                    <button onClick={() => handleGetData(word)}>{word}</button>
                  </li>
                ))
              }
            </ul>
          </div>

        </div>
    </div>
  );
}

export default App;
