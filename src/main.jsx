import React from "react"
import ReactDOM from "react-dom/client"
import { ApolloWrapper } from "./graphql/ApolloClient"
import { RouterProvider } from "react-router-dom"
import router from "./routes"
import { AuthProvider } from "./context/AuthContext"
import "react-toastify/dist/ReactToastify.css"
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <ApolloWrapper>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </ApolloWrapper>
)
