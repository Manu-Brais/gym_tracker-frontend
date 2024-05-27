import React from "react"
import { RotatingLines } from "react-loader-spinner"

const Button = ({ type = "button", onClick, isLoading, children }) => {
  return (
    <div className="button-container relative w-full h-[48px]">
      <button
        type={type}
        onClick={onClick}
        className="absolute inset-0 inline-flex items-center justify-center w-full h-full px-6 py-3 overflow-hidden font-bold text-pretty text-lg text-[#a2ffff] duration-500 bg-slate-950 rounded shadow-lg hover:bg-slate-800 hover:text-[#e3ffff] active:scale-95 transition-transform">
        <span className="absolute inset-0 transition-transform duration-300 transform bg-blue-800 opacity-0 group-hover:opacity-100 group-hover:scale-110 ease-in-out"></span>
        <span
          className={`relative z-10 ${
            isLoading ? "animate-pulse" : "fade-in"
          }`}>
          {isLoading ? (
            <RotatingLines
              width={24}
              height={24}
              strokeColor="#fff"
              strokeWidth="5"
              ariaLabel="three-dots-loading"
              visible={true}
            />
          ) : (
            children
          )}
        </span>
      </button>
    </div>
  )
}

export default Button
