import React from 'react'
import styles from './Form.module.css'

const Form = ({ submitSearch }) => (
  <form 
    onSubmit={(e) => submitSearch(e)}
    className={styles.form}
  >
    <input type="text" name="search"/>
    <button>search</button>
  </form>
)

export default Form
