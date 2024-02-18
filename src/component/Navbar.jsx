import React from "react"
import { Link } from "react-router-dom"
import logo from "../assets/jollie.jpg"
const Navbar = () => {
  return (
    <div className="flex justify-between w-[80%] mx-auto pt-4">
      <img src={logo} alt="" className="h-[40px] w-[50px]" />
      <div className="flex items-center gap-1">
        <Link
          to={"login"}
          className="text-2xl cursor-pointer font-semibold text-[#2e0606de]"
        >
          Login
        </Link>
        <span>/</span>
        <Link
          to={"signup"}
          className="text-2xl cursor-pointer font-semibold text-[#2e0606de]"
        >
          Sign Up
        </Link>
      </div>
    </div>
  )
}

export default Navbar
