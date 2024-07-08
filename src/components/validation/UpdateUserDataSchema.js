import * as Yup from "yup"

export const UpdateUserDataSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  surname: Yup.string(),
  phone: Yup.string(),
  address: Yup.string(),
  profilePicture: Yup.mixed().test("fileSize", "The file is too big", value => {
    if (!value) return true
    return value.size <= 2000000
  })
})
