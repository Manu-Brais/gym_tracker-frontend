import styles from "./FormInput.module.css"

const FormInput = ({
  id,
  label,
  name,
  error,
  onChange,
  onBlur,
  touched,
  value,
  type = "text"
}) => {
  return (
    <div className="mb-2">
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${
          touched && error
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-indigo-500"
        }`}
      />
      <div className="h-3">
        {touched && error ? (
          <p className="mt-1 text-xs text-red-600">{error}</p>
        ) : (
          <p className="mt-1 text-xs text-transparent">Placeholder</p>
        )}
      </div>
    </div>
  )
}

export default FormInput
