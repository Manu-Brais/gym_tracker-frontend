import React from "react"
import { createBrowserRouter } from "react-router-dom"
import Root from "./pages/Root.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import CoachProtectedRoute from "./components/CoachProtectedRoute.jsx"
import ErrorPage from "./pages/ErrorPage.jsx"
import SignUpForm from "./components/signUpForm.jsx"
import LogInForm from "./components/logInForm.jsx"
import CreateExerciseForm from "./components/CreateExerciseForm"
import ExercisesPage from "./pages/coach/exercises/ExercisesPage.jsx"
import ShowExercise from "./pages/coach/exercises/ShowExercise.jsx"
import ProfilePage from "./pages/user/profile/ProfilePage.jsx"
import SubscriptionTestPage from "./pages/SubscriptionTestPage.jsx"

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
                path: "/exercises/:id",
                element: <ShowExercise />
              },
              {
                path: "/create-exercise",
                element: <CreateExerciseForm />
              }
            ]
          },
          {
            path: "/profile",
            element: <ProfilePage />
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
        path: "subscription-test",
        element: <SubscriptionTestPage />
      },
      {
        path: "*",
        element: <ErrorPage />
      }
    ]
  }
])

export default router
