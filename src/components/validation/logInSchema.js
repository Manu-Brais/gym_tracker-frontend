import * as Yup from "yup"

const errorMessages = {
  email: {
    invalid: "👮🏽 Email non válido",
    required: "👮🏽 É necesario un email"
  },
  password: {
    required: "🔐 Contrasinal é obrigatorio"
  }
}

export const LogInSchema = Yup.object().shape({
  email: Yup.string()
    .email(errorMessages.email.invalid)
    .required(errorMessages.email.required),
  password: Yup.string().required(errorMessages.password.required)
})
