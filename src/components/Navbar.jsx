import React from "react"
import { Link, useNavigate } from "react-router-dom"
import Gymtrackr from "../assets/Gymtrackr.svg"
import { toast } from "react-toastify"
import { useAuth } from "../context/AuthContext"

export default function Navbar() {
  const { isAuthenticated, userId, logOut } = useAuth()
  const navigate = useNavigate()

  return (
    <nav className="flex items-center justify-between w-full px-10 py-4 bg-white shadow-md absolute top-0">
      <Link to="/">
        <img src={Gymtrackr} alt="gymtrackr" className="w-28" />
      </Link>
      <div className="flex items-center gap-10">
        {isAuthenticated ? (
          <>
            <button
              className="text-lg font-semibold text-gray-600"
              onClick={() => {
                logOut()
                toast.success("Sesión cerrada con éxito")
                navigate("/")
              }}>
              Fechar sesión
            </button>
            <Link to={`/${userId}/generate-referral-link`}>
              <button className="text-lg font-semibold text-gray-600">
                Xerar enlace de referencia
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/" className="text-lg font-semibold text-gray-600">
              Iniciar sesión
            </Link>
            <Link to="/signup" className="text-lg font-semibold text-gray-600">
              Rexistrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
