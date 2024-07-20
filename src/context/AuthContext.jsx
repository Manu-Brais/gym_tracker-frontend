import React, { createContext, useState, useContext } from "react"
import { jwtDecode } from "jwt-decode"
import { toast } from "react-toastify"
import Cookies from "js-cookie"
import client from "../graphql/ApolloClient"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const token = Cookies.get("gt-token")
  let user_id = null
  let user_type = null
  let exp = null

  if (token) {
    const decodedToken = jwtDecode(token)
    user_id = decodedToken.user_id
    user_type = decodedToken.user_type
    exp = decodedToken.exp
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
    client.resetStore()
    toast.success("See you soon!", { icon: "👋" })
  }

  if (exp && exp < Date.now() / 1000) {
    logOut()
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
