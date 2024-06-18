import React from "react"
import { Navigate, Outlet, redirect } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { toast } from "react-toastify"

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    toast.error("Debes iniciar sesión para acceder a esta página")
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
