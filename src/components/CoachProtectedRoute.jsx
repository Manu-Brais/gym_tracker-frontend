import React, { useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { toast } from "react-toastify"

const CoachProtectedRoute = () => {
  const { userType } = useAuth()
  const isACoach = userType == "coach"

  useEffect(() => {
    if (!isACoach) {
      toast.warning("You are not authorized to access this page")
    }
  }, [isACoach])

  if (!isACoach) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default CoachProtectedRoute
