import React from 'react'
import styles from './Form.module.css'

const Form = ({ handleGetData }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    
    const userSubmission = e.target.search.value,
          filteredSubmission = userSubmission.trim().replace(/[^a-zA-Z -]/g, ""),
          letters = filteredSubmission.match(/[A-Za-z]/g)

    e.target.search.value = ''

    if (!letters || letters.length < 2) return

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
