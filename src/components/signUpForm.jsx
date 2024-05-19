import React, { useState } from "react"
import { toast } from "react-toastify"
import { useMutation } from "@apollo/client"
import { SIGN_UP_MUTATION } from "../graphql/mutations/signUp"

import Form from "./Form"
import FormInput from "./FormInput"
import FormButton from "./FormButton"

const SignUpForm = () => {
  const [signUp, { data, loading, error }] = useMutation(SIGN_UP_MUTATION)
  const [formState, setFormState] = useState({
    name: "",
    surname: "",
    phone: "",
    address: "",
    type: "coach", // TODO - think about how to handle this value
    email: "",
    password: "",
    passwordConfirmation: ""
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormState({ ...formState, [name]: value })
  }

  const handleSubmit = () => {
    signUp({ variables: { input: formState } })
    if (error) {
      const errorMessage = JSON.parse(error.message)[0]
      toast.error(`Erro ao rexistrar o usuario: ${errorMessage}`)
    }
    if (data) {
      console.log(data)
      toast.success("Rexistro completado con éxito!")
      const token = data.signup.token
      localStorage.setItem("token", token)
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <label id="sign-up-form-title">Rexistro</label>
        <FormInput
          id="signUpName"
          name="name"
          value={formState.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <FormInput
          id="signUpSurname"
          name="surname"
          value={formState.surname}
          onChange={handleChange}
          placeholder="Surname"
        />
        <FormInput
          id="signUpPhone"
          name="phone"
          value={formState.phone}
          onChange={handleChange}
          placeholder="Phone"
        />
        <FormInput
          id="signUpAddress"
          name="address"
          value={formState.address}
          onChange={handleChange}
          placeholder="Address"
        />
        <FormInput
          id="signUpEmail"
          name="email"
          value={formState.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <FormInput
          id="signUpPassword"
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <FormInput
          id="signUpPasswordConfirmation"
          name="passwordConfirmation"
          type="password"
          value={formState.passwordConfirmation}
          onChange={handleChange}
          placeholder="Confirm Password"
        />
        <FormButton>Sign Up</FormButton>
      </Form>
    </>
  )
}

export default SignUpForm
