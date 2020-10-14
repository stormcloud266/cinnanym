import React, {useState} from 'react'
import axios from 'axios'

// Components
import Form from '../Form/Form'
import Header from '../Header/Header'
import List from '../List/List'
import styles from './App.module.css'

function App() {

  const [state, setState] = useState({
    rhymes: [],
    synonyms: [],
    similarTo: [],
    searchTerm: ''
  }) 

  const handleGetData = (word) => {
    
    // Adds form submission word to state 
    setState(prevState => ({
      ...prevState,
      searchTerm: word
    }))

    // Encodes word for URLs
    const searchTerm = encodeURI(word)

    getData(searchTerm)
  }


  const getData = (searchTerm) => {
    
    // Set endpoint URL depending on environment
    const dev = process.env.NODE_ENV === 'development'
    const url = dev ? 'http://localhost:9000/getData' : '/.netlify/functions/getData'

    // Makes call to lambda function with submitted word
    axios.get(url, { params: { searchTerm } })

      .then(res => {

        // Throws error if submission returns no results
        if (res.data.error) throw new Error();
        
        // If there are results, add them to state
        setState(prevState => ({
          ...prevState,
          ...res.data
        }))

      })
      .catch(err => {
        
        // Resets list but keeps search word on errors
        setState(prevState => ({
          ...prevState,
          rhymes: [],
          synonyms: [],
          similarTo: [],
        }))
      })
  }

  return (
    <div className={styles.app}>
    
      <Header />

      <Form handleGetData={handleGetData} />

      <div className={styles.textContainer}>
        {
          // Displays search word when submitted
          state.searchTerm && (
            <div>
              <p>You searched for</p>
              <h2>{state.searchTerm}</h2>
            </div>
          )
        }
      </div>

      <div className={styles.listContainer}>

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
