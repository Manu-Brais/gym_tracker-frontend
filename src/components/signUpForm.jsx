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
    type: "coach",
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

    if (data) {
      const token = data.signup.token
      localStorage.setItem("token", token)
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <label id="sign-up-form-title">Rexistro</label>
        <FormInput
          id="name"
          name="name"
          value={formState.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <FormInput
          name="surname"
          value={formState.surname}
          onChange={handleChange}
          placeholder="Surname"
        />
        <FormInput
          name="phone"
          value={formState.phone}
          onChange={handleChange}
          placeholder="Phone"
        />
        <FormInput
          name="address"
          value={formState.address}
          onChange={handleChange}
          placeholder="Address"
        />
        {/* <FormInput
          hidden
          name="type"
          // this value depends on the type of user you want to create
          // if the url contains the coach JWT token, the value will be "client"
          value={"coach"}
        /> */}
        <FormInput
          name="email"
          value={formState.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <FormInput
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <FormInput
          name="passwordConfirmation"
          type="password"
          value={formState.passwordConfirmation}
          onChange={handleChange}
          placeholder="Confirm Password"
        />
        <FormButton>Sign Up</FormButton>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && <p>Sign Up Successful!</p>}
      </Form>
    </>
  )
}

export default SignUpForm
