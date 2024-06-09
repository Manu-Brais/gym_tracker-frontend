import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { toast } from "react-toastify"

const CoachProtectedRoute = () => {
  //Here we have to get the user type from the context
  // If the user is a coach, we allow access to the nested routes
  const isACoach = false

  if (!isACoach) {
    toast.error("Non tes permiso para acceder a este recurso")
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default CoachProtectedRoute
