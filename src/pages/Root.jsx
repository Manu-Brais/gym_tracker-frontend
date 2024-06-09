import React from "react"
import { Outlet, useNavigation } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Navbar from "../components/Navbar"

export default function Root() {
  const navigation = useNavigation()

  return (
    <main
      className={`layout ${navigation.state == "loading" ? "loading" : ""}`}>
      <Navbar />
      <Outlet />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        stacked
      />
    </main>
  )
}
