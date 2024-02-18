import React, { useState } from "react"

import CustomSelect from "./CustomSelect"
import { useToast } from "../contexts/ToastContext"
import { useTags } from "../contexts/MenuContext"
import MenuItem from "./MenuItem"

const MenuComponent = () => {
  const { addMenuItem, menuItems, tags } = useTags()
  const toast = useToast()
  const [price, setPrice] = useState("")
  const [selected, setSelected] = useState("")
  const onAddMenuItem = e => {
    e.preventDefault()
    addMenuItem(selected, price)
    setSelected("")
    setPrice("")
    toast.open("Menu item added successfully!")
  }
  const isDisabled = !price.trim() || !selected.trim()
  return (
    <div>
      {menuItems.length > 0 && (
        <div className="bg-white max-h-[80px] overflow-y-auto my-2 px-4 py-2 rounded border">
          {menuItems?.map(item => (
            <MenuItem item={item} key={item.id} />
          ))}
        </div>
      )}
      <div className="flex items-baseline gap-2 w-[470px] ">
        <CustomSelect
          data={tags}
          selected={selected}
          setSelected={setSelected}
          title="Select Coffee Type"
        />
        <input
          value={price}
          min={0}
          type="number"
          name="price"
          id="price"
          className="border rounded-md w-[80px] outline-none h-[40px] p-2 "
          onChange={e => setPrice(e.target.value)}
        />
      </div>

      <button
        disabled={isDisabled}
        onClick={onAddMenuItem}
        className="border w-[240px] py-3 px-8 mt-2 rounded-md cursor-pointer text-white font-semibold bg-[#D17842]  outline-none"
      >
        Add Menu
      </button>
    </div>
  )
}

export default MenuComponent
