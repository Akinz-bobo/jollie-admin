import React from "react"

const Modal = ({ children }) => {
  return (
    <div
      className="absolute 
  flex flex-col gap-4 bg-white shadow-lg rounded-md top-[50px]
  z-50  p-4
 w-full
 max-h-[300px]
 overflow-y-auto
  "
    >
      {children}
    </div>
  )
}

export default Modal
