import React from 'react'
import styles from './Form.module.css'

const Form = ({ handleGetData }) => {

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Gets form submission and filters out everything except letters, hyphens
    // and spaces. Gets length of letter in submission
    const userSubmission = e.target.search.value,
          filteredSubmission = userSubmission.trim().replace(/[^a-zA-Z -]/g, ""),
          letters = filteredSubmission.match(/[A-Za-z]/g)
    
    // Clears search bar
    e.target.search.value = ''

    // Ensures there are at least two letters in search
    if (!letters || letters.length < 2) return

    // Calls handler from App.js
    handleGetData(filteredSubmission)
  }

  return (
    <form 
      onSubmit={(e) => handleSubmit(e)}
      className={styles.form}
    >
      <input type="text" name="search"/>
      <button>search</button>
    </form>
  )
}

export default Form
