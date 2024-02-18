import React from "react"
import FormComponent from "./FormComponent"
import { Link } from "react-router-dom"
import SigninForm from "./SigninForm"
import { motion } from "framer-motion"
const Signin = () => {
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
          <h3 className="text-3xl font-semibold my-[3rem]">
            Login into your Account
          </h3>
          <p className="text-lg text-gray-500 mb-4">
            Please fill in your details
          </p>
          <div>
            <SigninForm />
            <p className="mt-4">
              Don't have an account?{" "}
              <Link
                to={"/signup"}
                replace={true}
                preventScrollReset
                className="text-[#D17842] font-semibold text-xl"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Signin
