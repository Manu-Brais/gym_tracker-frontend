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
            element: (
              // This is an example, here we have to create a page to show the coach index, then
              // Inside this route we can create nested routes to show the exercises control pannel
              //
              // To test this you have to:
              // 1. Create a new exercise: http://localhost:3000/1/create-exercise
              // 2. Open the console and copy the videoUrl
              // 3. Paste the videoUrl in the videoUrl prop of the ShowVideoComponent usint this host: http://localhost:3000/
              <ShowVideoComponent
                videoUrl={
                  "http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MSwicHVyIjoiYmxvYl9pZCJ9fQ==--8720421703844e1bb604389b9d874feaff1b7c40/X-ray%20Man%20Animation.mp4"
                }
                title={"Curl bíceps"}
                description={
                  "Posición inicial: De pie, con los pies al ancho de los hombros y las rodillas ligeramente flexionadas. Sostén una pesa en cada mano, con los brazos extendidos y las palmas mirando hacia adelante.  Ejecución: Flexiona los codos para levantar las pesas hacia los hombros, manteniendo los codos cerca del torso y sin mover la parte superior de los brazos.  Finalización: Baja lentamente las pesas de vuelta a la posición inicial, extendiendo completamente los brazos.  Respiración: Inhala al levantar las pesas y exhala al bajarlas."
                }
              />
            )
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
