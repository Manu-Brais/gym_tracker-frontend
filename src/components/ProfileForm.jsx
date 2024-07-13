import React, { useEffect, useState } from "react"
import { useFormik } from "formik"
import { useQuery, useMutation } from "@apollo/client"
import { toast } from "react-toastify"
import FormInput from "../components/FormInput"
import Button from "../components/Button"
import Loader from "../components/Loader"
import { UpdateUserDataSchema } from "../components/validation/UpdateUserDataSchema"
import { FETCH_USER_DATA_QUERY } from "../graphql/queries/fetchUserData"
import { UPDATE_USER_DATA_MUTATION } from "../graphql/mutations/updateUserData"

function ProfileForm() {
  const { loading, error, data } = useQuery(FETCH_USER_DATA_QUERY)
  const [profilePicture, setProfilePicture] = useState(null)

  const [updateUserData] = useMutation(UPDATE_USER_DATA_MUTATION, {
    onCompleted: data => onCompletedMutation(data),
    onError: () => toast.error("Error al guardar los datos de perfil")
  })

  const handleSubmit = async values => {
    await updateUserData({ variables: { input: values } })
  }

  const formik = useFormik({
    validationSchema: UpdateUserDataSchema,
    onSubmit: handleSubmit,
    initialValues: {
      name: "",
      surname: "",
      phone: "",
      address: "",
      profilePicture: null
    }
  })

  const onCompletedMutation = data => {
    const { authenticatable } = data.updateUserData.userData
    const { name, surname, phone, address, avatarUrl } = authenticatable
    formik.setValues({
      name: name,
      surname: surname,
      phone: phone,
      address: address
    })
    console.log("AVATAR", avatarUrl)
    setProfilePicture(`http://localhost:3000${avatarUrl}`)
    toast.success("Profile data saved successfully")
  }

  const handleFileChange = event => {
    const file = event.currentTarget.files[0]
    if (file) {
      formik.setFieldValue("profilePicture", file)
      const url = URL.createObjectURL(file)
      setProfilePicture(url)
    }
  }

  useEffect(() => {
    if (data) {
      const { authenticatable } = data.fetchUserData
      const { name, surname, phone, address, avatarUrl } = authenticatable
      formik.setValues({
        name: name,
        surname: surname,
        phone: phone,
        address: address
      })
      setProfilePicture(`http://localhost:3000${avatarUrl}`)
    }
  }, [data])

  if (loading) return <Loader />
  if (error) return <p>Error: {error.message}</p>
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col w-full mx-auto rounded overflow-hidden shadow-md shadow-black-500 bg-slate-50/80">
      <div className="flex flex-col justify-end gap-3 w-full px-10 py-8 lg:order-1 lg:p-16 items-center lg:justify-between">
        <div className="relative flex items-center justify-center w-32 h-32 bg-white rounded-full overflow-hidden hover:bg-gray-200 cursor-pointer">
          {profilePicture ? (
            <img
              src={profilePicture}
              alt="profile"
              className="w-32 h-32 rounded-full object-cover"
            />
          ) : (
            <div className="text-gray-500">Upload</div>
          )}
          <input
            id="profilePicture"
            name="profilePicture"
            type="file"
            accept="image/*"
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex flex-col gap-[0.75rem] mb-4 w-full">
          <FormInput
            id="name"
            label="Name"
            name="name"
            placeholder="Jhon"
            error={formik.errors.name}
            touched={formik.touched.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            type="name"
          />
          <FormInput
            id="surname"
            label="Surname"
            name="surname"
            placeholder="Doe"
            error={formik.errors.surname}
            touched={formik.touched.surname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.surname}
            type="surname"
          />
          <FormInput
            id="phone"
            label="Phone"
            name="phone"
            placeholder="675123987"
            error={formik.errors.phone}
            touched={formik.touched.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            type="phone"
          />
          <FormInput
            id="address"
            label="Address"
            name="address"
            placeholder="C/ Santiago de Chile, 9"
            error={formik.errors.address}
            touched={formik.touched.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            type="address"
          />
        </div>
        <Button type="submit" isLoading={formik.isSubmitting}>
          Save
        </Button>
      </div>
    </form>
  )
}

export default ProfileForm
