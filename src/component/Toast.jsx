import React, { useEffect } from "react"
import { motion } from "framer-motion"

const Toast = ({ message, close }) => {
  let timer
  useEffect(() => {
    timer = setTimeout(() => close(), 3500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      transition={{ duration: 0.35, type: "spring", stiffness: 100 }}
      exit={{ x: "-100vw" }}
      className={` flex items-center justify-between py-2 px-6 rounded-md  z-20  w-[300px] bg-green-600 h-fit text-white  `}
    >
      <p>{message}</p>
      <button onClick={close} className="text-xl cursor-pointer">
        &times;
      </button>
    </motion.div>
  )
}

export default Toast
