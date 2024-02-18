import React, { createContext, useContext, useState } from "react"

export const FormContext = createContext()
export const useShopFormMetaData = () => {
  const ctx = useContext(FormContext)

  return { ...ctx }
}
const FormContextProvider = ({ children }) => {
  const [coverImage, setcCoverImage] = useState(null)
  const [images, setImages] = useState(null)

  const addCoverImage = files => {
    setcCoverImage(files)
  }
  const addImages = files => {
    setImages(files)
  }
  const formValues = {
    coverImage,
    images,
    addCoverImage,
    addImages,
  }
  return (
    <FormContext.Provider value={formValues}>{children}</FormContext.Provider>
  )
}

export default FormContextProvider
