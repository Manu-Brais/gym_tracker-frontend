import React from "react"
import styles from "./FormInput.module.css"

const FormInput = ({
  id,
  name,
  value,
  onChange,
  required = true,
  label,
  type = "text",
  error
}) => {
  return (
    <div className={styles.styled_input}>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        required={required}
        className={error ? styles.error : ""}
      />
      <label htmlFor={id}>{label}</label>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  )
}

export default FormInput
