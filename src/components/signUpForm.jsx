import React, { useState } from "react"
import { toast } from "react-toastify"

// Form handling and validation
import { useFormik } from "formik"
import { SignupSchema } from "./validation/signUpSchema"

// GraphQL
import { useMutation } from "@apollo/client"
import { SIGN_UP_MUTATION } from "../graphql/mutations/signUp"

// Components
import FormInput from "./FormInput"

// Image
import gymImage from "../assets/gym.png"

const SignUpForm = () => {
  const [signUp] = useMutation(SIGN_UP_MUTATION)

  const handleSubmit = async values => {
    try {
      const { data } = await signUp({ variables: { input: values } })
      if (data) {
        toast.success("Rexistro completado con éxito!")
        const token = data.signup.token
        localStorage.setItem("token", token)
      }
    } catch (error) {
      console.log(error)
      const errorMessage = JSON.parse(error.message)[0]
      toast.error(`Erro ao rexistrar o usuario: ${errorMessage}`)
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
      type: "coach" // TODO - think about how to handle this value
    },
    validationSchema: SignupSchema,
    onSubmit: data => {
      handleSubmit(data)
    }
  })

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col md:flex-row w-[94%] max-w-4xl min-w-80 rounded-xl overflow-hidden shadow-md bg-slate-50 mx-auto">
      <div className="flex order-2 md:order-1 flex-col gap-2 w-full md:w-1/2 p-6 md:p-12">
        <FormInput
          id="email"
          label="Email"
          name="email"
          error={formik.errors.email}
          touched={formik.touched.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        <FormInput
          id="password"
          label="Contrasinal"
          name="password"
          error={formik.errors.password}
          touched={formik.touched.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          type="password"
        />
        <FormInput
          id="passwordConfirmation"
          label="Confirmar contrasinal"
          name="passwordConfirmation"
          error={formik.errors.passwordConfirmation}
          touched={formik.touched.passwordConfirmation}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.passwordConfirmation}
          type="password"
        />
        <button
          type="submit"
          className="px-6 py-3 mt-4 font-semibold text-blue-700 border border-blue-700 rounded-md hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-blue-800 active:shadow-lg transition-all duration-300 ease-in-out transform active:scale-[99%]">
          Rexistrarse
        </button>
      </div>
      <img
        src={gymImage}
        alt="gym"
        className="order-1 md:order-2 w-full md:w-1/2 h-32 md:h-auto object-cover contrast-[55%] brightness-150"
      />
    </form>
  )
}

export default SignUpForm
