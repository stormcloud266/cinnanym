import React, { useState, useEffect } from "react"
import styles from './List.module.css'

const List = ({ title, list, handleGetData }) => {
  const [isShown, showAll] = useState(false)

  const onClick = (word) => {
    window.scrollTo({top: 0 })
    handleGetData(word)
  }

  useEffect(() => { 
    showAll(false) 
  }, [list])

  return (
    <div className={styles.list}>
      <h3>{title}</h3>
      {
        list.length === 0 ? (
          <p className={styles.placeholder}>Looks like there's nothing here.</p>
        ) : (
          <ul>
          {
            (list.length > 0) && list.slice(0, 30).map((word, i) => (
              <li key={i}>
                <button onClick={() => onClick(word)}>{word}</button>
              </li>
            ))
          }
  
          {
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
