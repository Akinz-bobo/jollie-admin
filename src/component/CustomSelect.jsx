import React, { useState } from "react"
import { ChevronDown, Search } from "lucide-react"

const CustomSelect = ({ data = [], selected = "", setSelected, title }) => {
  const [inputValue, setInputValue] = useState("")

  const [open, setOpen] = useState(false)
  return (
    <div className="w-full font-medium relativ ">
      <div
        onClick={() => setOpen(!open)}
        className={`${!selected && "text-gray-700"} 
        bg-[#EFF0F6] h-[50px] w-full p-2 flex items-center rounded-md justify-between border`}
      >
        {selected
          ? selected?.length > 30
            ? selected.substring(0, 30) + "..."
            : selected
          : title}
        <ChevronDown className={`${open && "rotate-180"}`} />
      </div>
      {data.length > 0 ? (
        <ul
          className={`${
            open ? "max-h-60" : "max-h-0"
          } bg-white mt-2 overflow-y-auto absolute w-[460px] shadow-md`}
        >
          {title !== "Select Category" && (
            <div className="flex items-center p-2 sticky top-0 bg-white ">
              <Search className="text-gray-700" size={20} />
              <input
                value={inputValue}
                onChange={e =>
                  setInputValue(e.target.value.toLocaleLowerCase())
                }
                type="text"
                placeholder="Search Coffee Type"
                className="placeholder:text-gray-700 p-2 outline-none placeholder:text-sm "
              />
            </div>
          )}
          {data?.map(item => (
            <li
              key={item.id}
              className={`p-2 text-sm hover:bg-[#D17842] hover:text-white
                
                ${
                  item?.tag?.toLowerCase() === selected.toLowerCase() &&
                  "bg-[#D17842] text-white"
                }
                ${
                  item.tag?.toLowerCase().startsWith(inputValue)
                    ? "block"
                    : "hidden"
                }`}
              onClick={() => {
                if (item.tag?.toLowerCase() !== selected.toLowerCase()) {
                  setSelected(item.tag)
                }
                setOpen(false)
                setInputValue("")
              }}
            >
              {item?.tag}
            </li>
          ))}
        </ul>
      ) : (
        <div
          className={`${
            open ? "block" : "hidden"
          } bg-white mt-2 p-3 w-full rounded-full`}
        >
          <span className="text-sm text-gray-400">
            No Coffee Type, Add Some
          </span>
        </div>
      )}
    </div>
  )
}

export default CustomSelect
