import { Route, Routes, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"

import Signin from "./component/Signin"
import Signup from "./component/Signup"
import OptionCard from "./component/OptionCard"
import CreateNewShopForm from "./component/CreateNewShopForm"
import App from "./App"
import { Table } from "./component/table"
import MenuContextProvider from "./contexts/MenuContext"
import ToastProvider from "./contexts/ToastContext"
import FormContextProvider from "./contexts/FormContext"
import TableContextProvider from "./contexts/TableContext"
export default function Root() {
  const location = useLocation()
  return (
    <AnimatePresence>
      <MenuContextProvider>
        <ToastProvider>
          <FormContextProvider>
            <TableContextProvider>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Signin />} />
                <Route path="/tables" element={<Table />} />
                <Route path="/home" element={<OptionCard />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/register" element={<CreateNewShopForm />} />
                <Route path="/registry" element={<Table />} />
              </Routes>
            </TableContextProvider>
          </FormContextProvider>
        </ToastProvider>
      </MenuContextProvider>
    </AnimatePresence>
  )
}
