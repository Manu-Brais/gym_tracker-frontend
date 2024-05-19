import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import { ApolloWrapper } from "./graphql/ApolloClient"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <ApolloWrapper>
    <App />
    <ToastContainer />
  </ApolloWrapper>
)
