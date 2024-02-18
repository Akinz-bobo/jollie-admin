import React from "react"

const MenuItem = ({ item }) => {
  return (
    <div className="flex items-center justify-between border-b border-b-dashed ">
      <p>{item.menuItem}</p>
      <p>${item.price}</p>
    </div>
  )
}

export default MenuItem
