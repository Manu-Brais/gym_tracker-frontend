import React, { createContext, useState, useContext } from "react"
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"
import { toast } from "react-toastify"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const token = Cookies.get("gt-token")
  let user_id = null
  let user_type = null

  if (token) {
    const decodedToken = jwtDecode(token)
    user_id = decodedToken.user_id
    user_type = decodedToken.user_type
  }

  const [isAuthenticated, setIsAuthenticated] = useState(!!token)
  const [userId, setUserId] = useState(user_id)
  const [userType, setUserType] = useState(user_type)

  const logIn = (token, userId, userType) => {
    const cookieOptions = {
      expires: 7,
      secure: true,
      sameSite: "Strict"
    }
    Cookies.set("gt-token", token, cookieOptions)
    setIsAuthenticated(true)
    setUserId(userId)
    setUserType(userType)
  }

  const logOut = () => {
    Cookies.remove("gt-token")
    setIsAuthenticated(false)
    setUserId(null)
    setUserType(null)
    toast.success("See you soon!", { icon: "👋" })
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userId, userType, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
