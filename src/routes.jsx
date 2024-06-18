import React from "react"
import { createBrowserRouter } from "react-router-dom"
import Root from "./pages/Root.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import CoachProtectedRoute from "./components/CoachProtectedRoute.jsx"
import ErrorPage from "./pages/ErrorPage.jsx"
import SignUpForm from "./components/signUpForm.jsx"
import LogInForm from "./components/logInForm.jsx"
import GenerateReferralLink from "./components/GenerateReferralLink.jsx"
import CreateExerciseForm from "./components/CreateExerciseForm"
import ExercisesPage from "./pages/coach/exercises/ExercisesPage.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <CoachProtectedRoute />,
            children: [
              {
                path: "/exercises",
                element: <ExercisesPage />
              },
              {
                path: "/generate-referral-link",
                element: <GenerateReferralLink />
              },
              {
                path: "/create-exercise",
                element: <CreateExerciseForm />
              }
            ]
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
