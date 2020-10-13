import React, {useState} from 'react';
import './App.css';
import axios from 'axios'

function App() {
  // https://wordsapiv1.p.rapidapi.com/words/bloody/similarTo
  // https://wordsapiv1.p.rapidapi.com/words/lovely/synonyms
  // https://wordsapiv1.p.rapidapi.com/words/word/rhymes

  const [state, setState] = useState({
    rhymes: [],
    synonyms: [],
    similar: []
  })


  const submitSearch = (e) => {
    e.preventDefault()
    const word = e.target.search.value

    getRhymes(word)
    getSynonyms(word)
    getSimilar(word)
  }

  const handleClick = (word) => {
    getRhymes(word)
    getSynonyms(word)
    getSimilar(word)
  }

  const headers = {
    "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
    "x-rapidapi-key": process.env.REACT_APP_WORDS_API_KEY
  }

  const url = `https://wordsapiv1.p.rapidapi.com/words`

  const getRhymes = (word) => {
    axios.get(`${url}/${word}/rhymes`, { headers })
      .then(res => {
        setState(prevState => ({
          ...prevState,
          rhymes: res.data.rhymes.all
      }));
      })
      .catch(err => console.log(err))
  }

  const getSynonyms = (word) => {
    axios.get(`${url}/${word}/synonyms`, { headers })
      .then(res => {
        setState(prevState => ({
          ...prevState,
          synonyms: res.data.synonyms
      }));
      })
      .catch(err => console.log(err))
  }

  const getSimilar = (word) => {
    axios.get(`${url}/${word}/similarTo`, { headers })
      .then(res => {
        setState(prevState => ({
          ...prevState,
          similar: res.data.similarTo
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
                    <button onClick={() => handleClick(word)}>{word}</button>
                  </li>
                ))
              }
            </ul>
          </div>

          <div className="section">
            <h3>Similar</h3>
            <ul>
              {
                state.similar.length > 0 && state.similar.map((word, i) => (
                  <li key={i}>
                    <button onClick={() => handleClick(word)}>{word}</button>
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
                    <button onClick={() => handleClick(word)}>{word}</button>
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
