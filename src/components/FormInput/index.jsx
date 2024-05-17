import React from "react"
import styles from "./FormInput.module.css"

const FormInput = ({ name, value, onChange, type = "text", placeholder }) => {
  return (
    <>
      <label id={name} className={styles.label}>
        {placeholder}
        <input
          id={name}
          className={styles.input}
          name={name}
          value={value}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
        />
      </label>
    </>
  )
}

export default FormInput
