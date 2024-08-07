const FormInput = ({
  id,
  label,
  name,
  error,
  onChange,
  onBlur,
  touched,
  value,
  placeholder,
  type = "text"
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-pretty text font-bold text-gray-500">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder={placeholder}
          rows="10"
          className={`mt-1 block w-full px-3 py-2 border bg-white/25 border-slate-800/15 rounded focus:outline-none placeholder:text-gray-300 placeholder:font-thin placeholder:italic ${
            touched && error
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-indigo-500"
          }`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder={placeholder}
          className={`mt-1 block w-full px-3 py-2 border bg-white/25 border-slate-800/15 rounded focus:outline-none placeholder:text-gray-300 placeholder:font-thin placeholder:italic ${
            touched && error
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-indigo-500"
          }`}
        />
      )}
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
