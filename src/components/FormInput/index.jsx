import React from "react"
import styles from "./FormInput.module.css"

const FormInput = ({
  id,
  name,
  value,
  onChange,
  type = "text",
  placeholder
}) => {
  return (
    <>
      <label id={id} className={styles.label}>
        {placeholder}
        <input
          id={id}
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
