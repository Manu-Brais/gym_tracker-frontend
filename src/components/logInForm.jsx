import React, { useState } from "react"
import { useMutation } from "@apollo/client"
import { LOG_IN_MUTATION } from "../graphql/mutations/logIn"
import { toast } from "react-toastify"
import Form from "./Form"
import FormInput from "./FormInput"
import FormButton from "./FormButton"
import styled from "styled-components"

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 35px;
  width: 100%;
  margin-bottom: 10px;
`

const LogInForm = () => {
  const [logIn, { data, loading, error }] = useMutation(LOG_IN_MUTATION)
  const [formState, setFormState] = useState({
    email: "",
    password: ""
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormState({ ...formState, [name]: value })
  }

  const handleSubmit = () => {
    logIn({ variables: { input: formState } })

    if (error) {
      const errorMessage = JSON.parse(error.message)[0]
      toast.error(`Error logging in: ${errorMessage}`)
    }
    if (data) {
      const token = data.login.token
      localStorage.setItem("token", token)
      setFormState({ email: "", password: "" })
      toast.success("Benvido! 🥹")
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <label id="log-in-form-title">Log In</label>
        <FormInput
          id="loginEmail"
          name="email"
          value={formState.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <FormInput
          id="loginPassword"
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <FormButton>Log In</FormButton>
      </Form>
    </>
  )
}

export default LogInForm
