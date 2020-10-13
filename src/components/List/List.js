import React, { useState } from "react"
import styles from './List.module.css'

const List = ({ title, list, handleGetData }) => {
  const [isShown, showAll] = useState(false)

  return (
    <div className={styles.list}>
      <h3>{title}</h3>
      <ul>
        {
          (list.length > 0) && list.slice(0, 60).map((word, i) => (
            <li key={i}>
              <button onClick={() => handleGetData(word)}>{word}</button>
            </li>
          ))
        }

        {
          (list.length > 60 && isShown) && list.slice(60).map((word, i) => (
            <li key={i}>
              <button onClick={() => handleGetData(word)}>{word}</button>
            </li>
          ))
        }
      </ul>
      {
        (list.length > 60 && !isShown) && (
          <button onClick={() => showAll(true)}>show all</button>
        )
      }
    </div>
  )
}

export default List
