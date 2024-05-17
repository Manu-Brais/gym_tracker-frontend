import React from "react"
import styles from "./Form.module.css"

const Form = ({ children, onSubmit }) => {
  const handleSubmit = e => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {children}
    </form>
  )
}

export default Form
