import React from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useFormik } from "formik"
import { SignupSchema } from "./validation/signUpSchema"
import { SIGN_UP_MUTATION } from "../graphql/mutations/signUp"
import useGraphQLMutation from "../hooks/useGraphQlMutation"
import { toast } from "react-toastify"
import FormInput from "./FormInput"
import Button from "./Button"
import gymImage from "../assets/gym.png"
import Gymtrackr from "../assets/Gymtrackr.svg"
import { jwtDecode } from "jwt-decode"

const SignUpForm = () => {
  const { logIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const setInitialValues = () => {
    const referral = queryParams.get("referral")
    const values = {
      type: referral ? "client" : "coach",
      email: "",
      password: "",
      passwordConfirmation: "",
      referralToken: referral || ""
    }
    return values
  }

  const onCompleted = data => {
    const token = data.signup.token
    const { user_id, user_type } = jwtDecode(token)

    logIn(token, user_id, user_type)
    navigate("/")
  }

  const { execute } = useGraphQLMutation(
    SIGN_UP_MUTATION,
    data => onCompleted(data),
    () => toast.success("Conta creada con éxito"),
    null
  )

  const handleSubmit = async values => {
    await execute({ input: values })
  }

  const formik = useFormik({
    initialValues: setInitialValues(),
    validationSchema: SignupSchema,
    onSubmit: handleSubmit
  })

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col mx-auto lg:flex-row w-[85%] min-w-80 max-w-[550px] lg:max-w-[950px] rounded overflow-hidden shadow-md shadow-black-500 bg-slate-50/80">
      <div className="relative lg:order-2 h-40 lg:h-auto w-full lg:w-1/2">
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
