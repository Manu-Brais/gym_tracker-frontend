import React, { useEffect } from "react"
import { toast } from "react-toastify"

// Form handling and validation
import { useFormik } from "formik"
import { SignupSchema } from "./validation/signUpSchema"

// GraphQL
import { SIGN_UP_MUTATION } from "../graphql/mutations/signUp"
import useGraphQLMutation from "../hooks/useGraphQlMutation"

// Components
import FormInput from "./FormInput"
import Button from "./Button"

// Image
import gymImage from "../assets/gym.png"
import Gymtrackr from "../assets/Gymtrackr.svg"

const SignUpForm = () => {
  const onCompleted = (data, resetForm) => {
    const token = data.signup.token
    localStorage.setItem("token", token)
    resetForm()
  }
  const { execute } = useGraphQLMutation(SIGN_UP_MUTATION, data =>
    onCompleted(data, formik.resetForm)
  )
  const handleSubmit = async (values, { resetForm }) => {
    await execute({ input: values })
  }

  const formik = useFormik({
    // TODO: Implement the logic to set `type` and `referralToken` based on the query params
    // if the query params are not present, the default values should be `coach` and `""`
    // and, if the query params are present, the default values should be:
    // `type` = `client`, referralToken:  params.`referralToken`
    initialValues: {
      type: "coach",
      email: "",
      password: "",
      passwordConfirmation: "",
      referralToken: ""
    },
    validationSchema: SignupSchema,
    onSubmit: handleSubmit
  })

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col lg:flex-row w-[85%] min-w-80 max-w-[550px] lg:max-w-[950px] rounded overflow-hidden shadow-md shadow-black-500 bg-slate-50/80">
      <div className="relative lg:order-2 lg:h-full h-36 w-full lg:w-1/2">
        <img
          src={gymImage}
          alt="gym"
          className="object-cover w-full h-full brightness-150"
        />
        <img
          src={Gymtrackr}
          alt="gym"
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 lg:w-64"
        />
      </div>
      <div className="flex flex-col justify-end gap-3 w-full px-10 py-8 lg:order-1 lg:w-1/2 lg:p-16 lg:items-center lg:justify-between">
        <div className="flex flex-col gap-[0.75rem] mb-4 w-full">
          <FormInput
            id="email"
            label="Email"
            name="email"
            placeholder="jhon@doe.com"
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
            placeholder="SecurePassword123!"
            error={formik.errors.password}
            touched={formik.touched.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            type="password"
          />
          <FormInput
            id="password-confirmation"
            label="Confirmación do contrasinal"
            name="passwordConfirmation"
            placeholder="SecurePassword123!"
            error={formik.errors.passwordConfirmation}
            touched={formik.touched.passwordConfirmation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.passwordConfirmation}
            type="password"
          />
        </div>
        <Button type="submit" isLoading={formik.isSubmitting}>
          Rexistrarse
        </Button>
      </div>
    </form>
  )
}

export default SignUpForm
