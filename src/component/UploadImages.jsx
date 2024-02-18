import React, { useRef } from "react"

const UploadImages = () => {
  const InputRef = useRef()
  const handleFileUpload = async () => {
    const files = InputRef.current.files
    const formData = new FormData()
    if (files.length > 0) {
      console.log(files)
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i])
      }
    }
    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      })
      const response = await res.json()
      console.log("Uploaded files", response.files)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <input type="file" multiple ref={InputRef} accept="images/*" />
      <button onClick={handleFileUpload}>Upload Files</button>
    </div>
  )
}

export default UploadImages
