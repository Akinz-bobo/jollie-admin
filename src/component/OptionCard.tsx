import React from "react"
import BackgroundImg from "../assets/bg4.png"
import { useNavigate } from "react-router-dom"

const OptionCard = () => {
  const navigate = useNavigate()
  return (
    <div
      style={{
        backgroundImage: `url(${BackgroundImg})`,
      }}
      className="h-screen bg-cover object-contain flex justify-center items-center"
    >
      <div className="bg-white/50 h-[400px] w-[30%] flex flex-col justify-center items-center gap-8 rounded-md">
        <button
          onClick={() => navigate("/register")}
          className="border w-[240px] py-3 px-8 rounded-md cursor-pointer text-white text-xl bg-[#D17842] hover:bg-[#3a200f]  outline-none"
        >
          Create New Entry
        </button>
        <button
          onClick={() => navigate("/tables")}
          className="border w-[240px] py-3 px-8 rounded-md cursor-pointer text-white text-xl bg-[#3a200f] hover:bg-[#D17842] outline-none"
        >
          View Registry
        </button>
      </div>
    </div>
  )
}

export default OptionCard
