import React, { useRef, useState } from "react"
import { Upload, X, FileText } from "lucide-react"
import { useFormContext } from "react-hook-form"

const ImageUpload = ({ name }) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const { setValue } = useFormContext()
  const inputRef = useRef()

  // State variables for tracking file-reated information

  const handleFileChange = event => {
    const files = event.target.files
    if (files && files.length > 0) {
      const fileToUpload = []
      let length = files.length > 3 ? 3 : files.length
      for (let i = 0; i < length; i++) {
        fileToUpload.push(files[i])
      }
      setSelectedFile([...fileToUpload])
      setValue(name, [...fileToUpload])
    }
  }

  // Function to trigger file input dialog
  const onChooseFile = () => {
    inputRef.current.click()
  }
  // Function to clear selected file  and reset state
  const clearFileInput = () => {
    inputRef.current.value = ""
    setSelectedFile(null)
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
      {!selectedFile && (
        <div
          className="flex items-center bg-gray-200/60 text-gray-500 hover:bg-[#D17842] hover:text-white w-fit py-4 px-8 rounded-md cursor-pointer gap-2"
          onClick={onChooseFile}
        >
          <Upload />
          <span className="text-xl font-[500] ">Upload File</span>
        </div>
      )}
      {/* Display file information and progress when a file is selected */}
      {selectedFile && (
        <>
          <div className="flex gap-4 mb-6 py-2 items-center border p-4 shadow-sm rounded-md">
            <FileText className="text-green-500" />
            <div className="flex items-center justify-between gap-4 flex-1">
              <div className="flex-1 flex flex-col gap-1">
                {/* Display file name and progress bar */}
                <h6>{selectedFile.name}</h6>
                <div className="bg-gray-200/50 w-full h-[5px]">
                  <div className="w-[100%] h-[5px] bg-green-500 rounded-sm transition-all "></div>
                </div>
              </div>
              {/* Display clear button or upload progress/checkmark */}
              <div onClick={clearFileInput}>
                <X className="border rounded-sm text-red-600 cursor-pointer " />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {selectedFile.map((file, ind) => (
              <img
                src={URL.createObjectURL(file)}
                key={ind}
                className="h-[40px] w-[40px] bg-cover object-cover mb-4"
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default ImageUpload
