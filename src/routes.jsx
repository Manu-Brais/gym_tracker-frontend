import React from "react"
import { createBrowserRouter } from "react-router-dom"
import Root from "./pages/Root.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import ErrorPage from "./pages/ErrorPage.jsx"
import SignUpForm from "./components/signUpForm.jsx"
import LogInForm from "./components/logInForm.jsx"
import GenerateReferralLink from "./components/GenerateReferralLink.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/:coachId/generate-referral-link",
            element: <GenerateReferralLink />
          }
        ]
      },
      {
        path: "/",
        element: <LogInForm />
      },
      {
        path: "signup",
        element: <SignUpForm />
      },
      {
        path: "*",
        element: <ErrorPage />
      }
    ]
  }
])

export default router
