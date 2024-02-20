import React, { useRef, useState } from "react"
import { Upload, X } from "lucide-react"
import { useFormContext } from "react-hook-form"
import { imageUploadDB } from "./firebase.config"
import { v4 } from "uuid"
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage"
const ImageUpload = ({ name }) => {
  const [selectedFile, setSelectedFile] = useState([])
  const { setValue } = useFormContext()
  const inputRef = useRef()

  // State variables for tracking file-reated information

  const handleFileChange = event => {
    const files = event.target.files
    if (files && files.length > 0) {
      let length = files.length > 3 ? 3 : files.length
      for (let i = 0; i < length; i++) {
        const images = ref(
          imageUploadDB,
          "images/" + name + "-" + v4() + "." + files[i].type.split("/")[1]
        )
        uploadBytes(images, files[i], {
          contentType: files[i].type,
        }).then(val =>
          getDownloadURL(val.ref).then(url => {
            setSelectedFile(prev => [...prev, url])
          })
        )
      }
    }
  }
  setValue(name, [...selectedFile])

  const onChooseFile = () => {
    inputRef.current.click()
  }
  // Function to clear selected file  and reset state
  const clearFileInput = url => {
    const storage = getStorage()
    // Create a reference to the file to delete
    const desertRef = ref(
      storage,
      `images/${url.split("%2F")[1].split("?")[0]}`
    )

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        setSelectedFile(prev => prev.filter(file => file !== url))
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className="upload-box">
      {/* File input element with a reference */}
      <input
        type="file"
        multiple
        accept="image/*"
        name={name}
        ref={inputRef}
        max={3}
        onChange={handleFileChange}
        className={`border py-2 px-4 rounded-md cursor-pointer`}
        style={{ display: "none" }}
      />
      {/* Button to trigger the file input dialog */}
      {!selectedFile.length > 0 && (
        <div
          className="flex items-center bg-gray-200/60 text-gray-500 hover:bg-[#D17842] hover:text-white w-fit py-4 px-8 rounded-md cursor-pointer gap-2"
          onClick={onChooseFile}
        >
          <Upload />
          <span className="text-xl font-[500] ">Upload File</span>
        </div>
      )}

      {/* Display file information and progress when a file is selected */}
      {selectedFile.length > 0 && (
        <>
          <div className="flex items-center gap-4">
            {selectedFile.map((file, ind) => (
              <div className="relative" key={ind}>
                <img
                  src={file}
                  className="h-[40px] w-[40px] bg-cover object-cover mb-4"
                />
                <div onClick={() => clearFileInput(file)}>
                  <X className="border absolute top-[-10px] right-[-15px] rounded-sm text-red-600 cursor-pointer " />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default ImageUpload
