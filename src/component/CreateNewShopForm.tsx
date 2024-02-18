import React, { useState } from "react"
import { motion } from "framer-motion"
import ShopForm from "./ShopForm"
import OriginForm from "./OriginForm"
import { useNavigate } from "react-router-dom"

// Categories
const CATEGORIES = [
  { id: 1, tag: "Origin" },
  { id: 2, tag: "Shop" },
]

const CreateNewShopForm = () => {
  const [selected, setSelected] = useState("Origin")
  const navigate = useNavigate()
  return (
    <motion.section
      className="w-full flex flex-col items-center "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
    >
      <div className="grid grid-cols-2 w-[80%] mx-auto mt-4 mb-10 ">
        <button
          onClick={() => navigate("/home")}
          className=" py-3 text-xl px-10 outline-none font-semibold cursor-pointer border-none w-fit text-[#381212] bg-[#EFF0F6] hover:bg-[#D17842] rounded-md hover:text-white"
        >
          Home
        </button>
        <h3 className="text-2xl font-semibold  text-[#381212]">
          Register Company
        </h3>
      </div>

      <div className="bg-white w-[60%] mx-auto my-8 ">
        {selected === "Shop" ? (
          <ShopForm
            selected={selected}
            setSelected={setSelected}
            CATEGORIES={CATEGORIES}
          />
        ) : (
          <OriginForm
            selected={selected}
            setSelected={setSelected}
            CATEGORIES={CATEGORIES}
          />
        )}
      </div>
    </motion.section>
  )
}

export default CreateNewShopForm
