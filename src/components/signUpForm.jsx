import React, { useState } from "react"
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
  }

  if (data) {
    const token = data.signup.token
    localStorage.setItem("token", token)
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <section id="form-notices">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {data && <p>Sign Up Successful!</p>}
        </section>
        <label id="sign-up-form-title">Rexistro</label>
        <FormInput
          label="Nome"
          id="signUpName"
          name="name"
          value={formState.name}
          onChange={handleChange}
        />
        <FormInput
          label="Apelidos"
          id="signUpSurname"
          name="surname"
          value={formState.surname}
          onChange={handleChange}
        />
        <FormInput
          label="Teléfono"
          id="signUpPhone"
          name="phone"
          value={formState.phone}
          onChange={handleChange}
        />
        <FormInput
          label="Enderezo"
          id="signUpAddress"
          name="address"
          value={formState.address}
          onChange={handleChange}
        />
        <FormInput
          label="Email"
          id="signUpEmail"
          name="email"
          value={formState.email}
          onChange={handleChange}
        />
        <FormInput
          label="Contrasinal"
          id="signUpPassword"
          name="password"
          value={formState.password}
          onChange={handleChange}
          type="password"
        />
        <FormInput
          label="Confirmar contrasinal"
          id="signUpPasswordConfirmation"
          name="passwordConfirmation"
          value={formState.passwordConfirmation}
          onChange={handleChange}
          type="password"
        />
        <FormButton type="submit">Rexistrarse</FormButton>
      </Form>
    </>
  )
}

export default SignUpForm
