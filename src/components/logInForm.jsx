// import React, { useState } from "react"
// import { useMutation } from "@apollo/client"
// import { LOG_IN_MUTATION } from "../graphql/mutations/logIn"
// import { toast } from "react-toastify"
// import { useForm } from "react-hook-form"
// import Form from "./Form"
// import FormInput from "./FormInput"
// import FormButton from "./FormButton"

// const LogInForm = () => {
//   const [logIn, { data, loading, error }] = useMutation(LOG_IN_MUTATION)
//   const { register, handleSubmit, formState } = useForm()

//   if (formState.errors?.email?.message || formState.errors?.password?.message) {
//     toast.error(
//       `Error: ${
//         formState.errors?.email?.message || formState.errors?.password?.message
//       }`
//     )
//   }
//   const onSubmit = formData => {
//     logIn({ variables: { input: formData } })
//     if (data) {
//       const token = data.login.token
//       localStorage.setItem("token", token)
//       console.log(formState)
//       toast.success("Benvido! 🥹")
//     }
//   }

//   return (
//     <>
//       <Form onSubmit={handleSubmit(onSubmit)}>
//         <label id="log-in-form-title">Log In</label>
//         <FormInput
//           register={register("email", {
//             required: { value: true, message: "Email is required" },
//             minLength: {
//               value: 5,
//               message: "Email must be at least 5 characters long"
//             }
//           })}
//           label="email"
//           id="loginEmail"
//         />
//         <FormInput
//           register={register("password", {
//             required: { value: true, message: "Password is required" },
//             minLength: {
//               value: 5,
//               message: "Password must be at least 5 characters long"
//             }
//           })}
//           label="password"
//           type="password"
//           id="loginPassword"
//         />
//         <FormButton>Log In</FormButton>
//       </Form>
//     </>
//   )
// }

// export default LogInForm
