import { createContext, useContext, useState } from "react"

export const TableContext = createContext()

export const useTableData = () => {
  const ctx = useContext(TableContext)
  console.log(ctx)
  return ctx
}

const TableContextProvider = ({ children }) => {
  const [shopData, setShopData] = useState([])
  const [originData, setOriginData] = useState([])
  console.log({ originData, shopData })
  const value = {
    shopData,
    originData,
    setOriginData,
    setShopData,
  }
  return <TableContext.Provider value={value}>{children}</TableContext.Provider>
}

export default TableContextProvider
