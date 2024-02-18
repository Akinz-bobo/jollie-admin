import React, { createContext, useState, useContext, useMemo } from "react"

export const MenuContext = createContext()
export const useTags = () => {
  const { tags, menuItems, addMenuItem, addTag, removeTag, clearEntries } =
    useContext(MenuContext)
  return { tags, menuItems, addMenuItem, addTag, removeTag, clearEntries }
}
const MenuContextProvider = ({ children }) => {
  const [tags, setTags] = useState([])
  const [menuItems, setMenuItem] = useState([])

  const clearEntries = () => {
    setTags([])
    setMenuItem([])
  }
  const addTag = message => {
    const newTag = {
      id: Date.now(),
      tag: message,
    }
    setTags(previousTags => [...previousTags, newTag])
  }

  function removeTag(tagItem) {
    setMenuItem(previousMenuItems =>
      previousMenuItems.filter(item => item.menuItem !== tagItem.tag)
    )
    setTags(previousTags => previousTags.filter(item => item.id !== tagItem.id))
  }
  const addMenuItem = (menu, price) => {
    const newMenuItem = {
      id: Date.now(),
      menuItem: menu,
      price,
    }
    setMenuItem(previousMenuItem => [...previousMenuItem, newMenuItem])
  }

  const contextValue = useMemo(
    () => ({
      tags,
      addTag,
      menuItems,
      addMenuItem,
      removeTag,
      clearEntries,
    }),
    [tags, menuItems]
  )
  return (
    <MenuContext.Provider value={contextValue}>{children}</MenuContext.Provider>
  )
}

export default MenuContextProvider
