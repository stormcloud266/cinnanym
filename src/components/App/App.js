import React, {useState} from 'react'
import axios from 'axios'
import Form from '../Form/Form'
import Header from '../Header/Header'
import List from '../List/List'
import styles from './App.module.css'

function App() {
  // https://wordsapiv1.p.rapidapi.com/words/bloody/similarTo
  // https://wordsapiv1.p.rapidapi.com/words/lovely/synonyms
  // https://wordsapiv1.p.rapidapi.com/words/word/rhymes

  const [state, setState] = useState({
    rhymes: [],
    synonyms: [],
    similarTo: [],
    searchTerm: ''
  })

  const submitSearch = (e) => {
    e.preventDefault()
    const word = e.target.search.value
    handleGetData(word)
  }

  const handleGetData = (word) => {

    setState(prevState => ({
      ...prevState,
      searchTerm: word
    }))

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
    <div className={styles.app}>
      
      <Header />

      <Form submitSearch={submitSearch} />

      <div className={styles.textContainer}>
        <p>Searching for...</p>
        <h2>{state.searchTerm}</h2>
      </div>

      <div className={styles.flex}>

        <List
          title={'Synonyms'}
          list={state.synonyms}
          handleGetData={handleGetData}
        />

        <List
          title={'Similar'}
          list={state.similarTo}
          handleGetData={handleGetData}
        />

        <List
          title={'Rhymes'}
          list={state.rhymes}
          handleGetData={handleGetData}
        />

      </div>
    </div>
  );
}

export default App;
