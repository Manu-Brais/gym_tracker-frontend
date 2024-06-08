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
            element: <CoachProtectedRoute />,
            children: [
              {
                path: "/:coachId/generate-referral-link",
                element: <GenerateReferralLink />
              },
              {
                path: "/:coachId/create-exercise",
                element: <CreateExerciseForm />
              }
            ]
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
                  "http://localhost:3000//rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MzUsInB1ciI6ImJsb2JfaWQifX0=--56d65105d72dd7b37a2a7d5d7a76d7961d6de402/speciesism_en.mp4"
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
