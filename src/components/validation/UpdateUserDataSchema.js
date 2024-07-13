import * as Yup from "yup"

export const UpdateUserDataSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  surname: Yup.string(),
  phone: Yup.string(),
  address: Yup.string()
})
