import React from "react"
import { Link, useNavigate } from "react-router-dom"
import Gymtrackr from "../assets/Gymtrackr.svg"
import { useAuth } from "../context/AuthContext"

export default function Navbar() {
  const { isAuthenticated, logOut } = useAuth()
  const navigate = useNavigate()

  const handleClick = () => {
    logOut()
    navigate("/")
  }

  return (
    // This is a temporary navbar, for development purposes only
    // Wil be replaced by a more complex navbar in the future when
    // the design is clearer
    <nav className="flex items-center justify-between w-full px-10 py-4 bg-white shadow fixed top-0 h-20 z-10">
      <Link to="/">
        <img src={Gymtrackr} alt="gymtrackr" className="w-16" />
      </Link>
      <div className="flex items-center gap-10">
        {isAuthenticated ? (
          <>
            <button
              className="text-lg font-light text-gray-600"
              onClick={handleClick}>
              Logout
            </button>
            <Link to="/generate-referral-link">
              <button className="text-lg font-light text-gray-600">
                Get Referral Link
              </button>
            </Link>
            <Link to="/exercises">
              <button className="text-lg font-light text-gray-600">
                Exercises
              </button>
            </Link>
            <Link to="/profile">
              <button className="text-lg font-light text-gray-600">
                My profile
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/" className="text-lg font-light text-gray-600">
              Login
            </Link>
            <Link to="/signup" className="text-lg font-light text-gray-600">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
