import React from "react"
import styles from "./FormButton.module.css"

const FormButton = ({ children, type = "submit" }) => {
  return (
    <button className={styles.formButton} type={type}>
      {children}
    </button>
  )
}

export default FormButton
