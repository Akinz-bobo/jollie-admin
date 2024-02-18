import React from "react"
import { Link } from "react-router-dom"
import FormComponent from "./FormComponent"
import { motion } from "framer-motion"
const Signup = () => {
  /* 
initial= {{width:0}}
animate={{width:"100%"}}
exit={{x: window.innerWidth, transition:{duration:0.1}}}

 initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}

  */
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1, transition: { duration: 0.1 } }}
      className="background"
    >
      <div className="bg-white h-full w-[50%] flex gap-8 p-8">
        <h3 className="text-3xl">Coffee Shop</h3>
        <div className="w-[60%]">
          <h3 className="text-3xl font-semibold mb-2">Sign Up an Account</h3>
          <p className="text-lg text-gray-500 mb-4">
            Please fill in your details
          </p>
          <div>
            <FormComponent />
            <p className="mt-4">
              Already have an account?{" "}
              <Link
                to={"/login"}
                replace
                preventScrollReset
                className="text-[#D17842] font-semibold text-xl"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Signup
