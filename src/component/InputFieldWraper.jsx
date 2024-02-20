import React from "react"

const InputFieldWraper = ({ errors, title, name, children }) => {
  return (
    <div className="mb-4 w-full ">
      <label htmlFor={name} className="block text-gray-600 text-xl mb-2">
        {title}
      </label>
      {children}
      {errors[name] && (
        <p className="text-red-500 text-sm">{errors[name].message}</p>
      )}
    </div>
  )
}

export default InputFieldWraper
