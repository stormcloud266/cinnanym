import React, { useState, useEffect } from "react"
import styles from './List.module.css'

const List = ({ title, list, handleGetData }) => {
  const [isShown, showAll] = useState(false)

  // Scrolls to top of page and calls handler from App.js
  // when a word is clicked
  const onClick = (word) => {
    window.scrollTo({top: 0 })
    handleGetData(word)
  }

  // Resets show all button when list changes (when a word is clicked) 
  useEffect(() => { 
    showAll(false) 
  }, [list])

  return (
    <div className={styles.list}>
      <h3>{title}</h3>

      {
        // Shows p placeholder when there are no results
        list.length === 0 ? (
          <p className={styles.placeholder}>Looks like there's nothing here.</p>
        ) : (
          <ul>
          {
            // Shows first 30 results
            (list.length > 0) && list.slice(0, 30).map((word, i) => (
              <li key={i}>
                <button onClick={() => onClick(word)}>{word}</button>
              </li>
            ))
          }
  
          {
            // Gets results over 30 but doesn't show them unless isShown is true
            (list.length > 30 && isShown) && list.slice(30).map((word, i) => (
              <li key={i}>
                <button onClick={() => onClick(word)}>{word}</button>
              </li>
            ))
          }
          </ul>
        )
      }
     
      {
        // Sets isShown to true when clicked
        (list.length > 30 && !isShown) && (
          <button 
            onClick={() => showAll(true)}
            className={styles.readMore}
          >
            Show All
          </button>
        )
      }
    </div>
  )
}

export default List
