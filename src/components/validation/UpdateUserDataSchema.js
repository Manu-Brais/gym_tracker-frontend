import * as Yup from "yup"

export const UpdateUserDataSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es requerido"),
  surname: Yup.string(),
  phone: Yup.string(),
  address: Yup.string()
})
