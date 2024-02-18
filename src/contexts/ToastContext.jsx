import { createContext, useContext, useMemo, useState } from "react"
import Toast from "../component/Toast"

const ToastContext = createContext()

export const useToast = () => {
  const toast = useContext(ToastContext)
  return toast
}

const ToastProvider = ({ children }) => {
  const [toastMessages, setToastMessages] = useState([])
  function openToast(message) {
    const newToast = {
      id: Date.now(),
      message,
    }

    setToastMessages(previousToasts => [...previousToasts, newToast])
  }

  function closeToast(id) {
    setToastMessages(previousToasts =>
      previousToasts.filter(toast => toast.id !== id)
    )
  }
  const contextValue = useMemo(
    () => ({
      open: openToast,
      close: closeToast,
    }),
    []
  )

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div className="w-full flex flex-col gap-2 justify-center items-center absolute top-1 ">
        {toastMessages.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            close={() => closeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export default ToastProvider
