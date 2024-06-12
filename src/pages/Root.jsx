import React from "react"
import { Outlet, useNavigation } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Navbar from "../components/Navbar"

export default function Root() {
  return (
    <main className="layout min-h-full">
      <Navbar />
      <div className="pt-20 w-full">
        <Outlet />
      </div>
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
