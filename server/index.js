const express = require("express")
const { google } = require("googleapis")
const multer = require("multer")
const path = require("path")
const cors = require("cors")
const fs = require("fs")

const app = express()
// set up storage

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    const extname = file.originalname.split(".").pop()
    cb(null, `${file.fieldname}-${Date.now()}.${extname}`)
  },
})

const upload = multer({ storage })
app.use(cors())

app.post("/upload", upload.array("files"), async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: "key.json",
      scopes: ["https://www.googleapis.com/auth/drive"],
    })
    const drive = google.drive({
      version: "v3",
      auth,
    })

    const uploadedFiles = []
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i]
      const response = await drive.files.create({
        requestBody: {
          name: file.originalname,
          mimeType: file.mimeType,
          parents: ["1O9Zih2Hngtk6jEG8vrYvsqUmHe_FAPdV"],
        },
        media: {
          body: fs.createReadStream(file.path),
        },
      })
      uploadedFiles.push(response.data)
    }
    res.status(201).json({
      message: "files uploaded successfully!",
      files: uploadedFiles,
    })
  } catch (error) {
    console.log(error)
  }
})

app.listen(5000, () => console.log("listening on port 5000"))
