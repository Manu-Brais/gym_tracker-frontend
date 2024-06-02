import React from "react"
import { createBrowserRouter } from "react-router-dom"
import Root from "./pages/Root.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import ErrorPage from "./pages/ErrorPage.jsx"
import SignUpForm from "./components/signUpForm.jsx"
import LogInForm from "./components/logInForm.jsx"
import GenerateReferralLink from "./components/GenerateReferralLink.jsx"
import CreateExerciseForm from "./components/CreateExerciseForm"
import ShowVideoComponent from "./components/ShowVideoComponent"

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
          },
          {
            path: "/:coachId/create-exercise",
            element: <CreateExerciseForm />
          },
          {
            path: "/video",
            element: <ShowVideoComponent />
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
