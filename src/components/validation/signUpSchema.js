import * as Yup from "yup"

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
const errorMessages = {
  email: {
    invalid: "👮🏽 Email non válido",
    required: "👮🏽 É necesario un email"
  },
  password: {
    min: "👮🏽 Mínimo 8 caracteres",
    required: "🔐 Contrasinal é obrigatorio",
    pattern: "🔐 Debe conter polo menos unha maiúscula, minúscula e un número"
  },
  passwordConfirmation: {
    match: "😅 Os contrasinais non coinciden",
    required: "🔐 Confirma o contrasinal"
  }
}

export const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email(errorMessages.email.invalid)
    .required(errorMessages.email.required),
  password: Yup.string()
    .min(8, errorMessages.password.min)
    .required(errorMessages.password.required)
    .matches(passwordRegex, errorMessages.password.pattern),
  passwordConfirmation: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      errorMessages.passwordConfirmation.match
    )
    .required(errorMessages.passwordConfirmation.required)
})
