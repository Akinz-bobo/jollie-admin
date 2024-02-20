import "./App.css"
import Signin from "./component/Signin"
import Lottie from "lottie-react"
import groovyWalkAnimation from "./lottie1.json"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

function App() {
  const data = [
    "Html",
    "Text",
    "Textarea",
    "Button",
    "Checkbox",
    "Paragraph",
    "Table",
    "Accordion",
    "Aside",
    "Headings",
    "Javascript",
    "React",
    "Angular",
    "Vue",
    "Nodejs",
    "Typescript",
    "NextJS",
  ]

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    setTimeout(() => setLoading(false), 5000)
  }, [])
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1, transition: { duration: 0.1 } }}
    >
      {/* <TagsInput /> */}

      {loading ? (
        <div className="flex items-center justify-center h-screen w-screen">
          <Lottie
            animationData={groovyWalkAnimation}
            loop={true}
            style={{ height: "300px" }}
          />
        </div>
      ) : (
        <Signin />
      )}
    </motion.div>
  )
}

export default App
