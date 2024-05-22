import * as Yup from "yup"

export const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("👮🏽 Email non válido")
    .required("👮🏽 É necesario un email"),
  password: Yup.string()
    .min(8, "👮🏽 Mínimo 8 caracteres")
    .required("🔐 Contrasinal é obrigatorio")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "🔐 Debe conter polo menos unha maiúscula, minúscula e un numero"
    ),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "😅 Os contrasinais non coinciden")
    .required("Confirma o contrasinal")
})
