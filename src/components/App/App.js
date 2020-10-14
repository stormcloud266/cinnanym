import React, {useState} from 'react'
import axios from 'axios'
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

    setState(prevState => ({
      ...prevState,
      searchTerm: word
    }))

    const searchTerm = encodeURI(word)

    getData(searchTerm)
  }


  const getData = (searchTerm) => {

    const dev = process.env.NODE_ENV === 'development'
    const url = dev ? 'http://localhost:9000/getData' : '/.netlify/functions/getData'

    axios.get(url, { params: { searchTerm } })

      .then(res => {

        if (res.data.error) throw new Error();

        setState(prevState => ({
          ...prevState,
          ...res.data
        }))

      })
      .catch(err => {
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
          state.searchTerm && (
            <div>
              <p>Your search term</p>
              <h2>{state.searchTerm}</h2>
            </div>
          )
        }
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
