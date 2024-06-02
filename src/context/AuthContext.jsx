import React, { createContext, useState, useContext, useEffect } from "react"
import Cookies from "js-cookie"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get("token"))
  const [userId, setUserId] = useState(Cookies.get("user_id"))

  useEffect(() => {
    const token = Cookies.get("token")
    setIsAuthenticated(!!token)
    setUserId(Cookies.get("user_id"))
  }, [])

  const logIn = (token, userId) => {
    Cookies.set("token", token, {
      expires: 7,
      secure: true,
      sameSite: "Strict"
    })
    Cookies.set("user_id", userId, {
      expires: 7,
      secure: true,
      sameSite: "Strict"
    })
    setIsAuthenticated(true)
    setUserId(userId)
  }

  const logOut = () => {
    Cookies.remove("token")
    Cookies.remove("user_id")
    setIsAuthenticated(false)
    setUserId(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
