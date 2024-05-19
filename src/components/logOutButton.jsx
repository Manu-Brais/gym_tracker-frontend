import React, { useState } from "react"
import { toast } from "react-toastify"
import styled from "styled-components"

const Button = styled.button`
  background-color: #f1356d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 10px 20px;
  transition: background 0.3s;
  height: 60px;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.75rem;
  &:hover {
    background-color: grey;
  }
`

const Spinner = styled.div`
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const LogOutButton = () => {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    const token = localStorage.getItem("token")
    if (token) {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1500))
      localStorage.removeItem("token")
      setLoading(false)
      toast.success("Sesión cerrada con éxito")
    } else {
      alert("Ninguna sesión activa")
    }
  }

  return (
    <>
      <Button type="button" onClick={handleClick} disabled={loading}>
        {loading ? <Spinner></Spinner> : "Log out"}
      </Button>
    </>
  )
}

export default LogOutButton
