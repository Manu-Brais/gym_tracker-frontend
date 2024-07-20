import React from "react"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Navbar from "../components/Navbar"

export default function Root() {
  return (
    <main className="min-h-full w-full min-w-[800px]">
      <Navbar />
      <div className="flex justify-center align-middle items-center min-h-full min-w-[800px]">
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
