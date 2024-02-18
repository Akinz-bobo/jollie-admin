import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import Root from "./Root.jsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
const router = createBrowserRouter([{ path: "*", Component: Root }])
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <Root />
    </RouterProvider>
  </React.StrictMode>
)
