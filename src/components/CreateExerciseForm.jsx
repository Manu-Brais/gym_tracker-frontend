import React from "react"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import { CreateExerciseSchema } from "./validation/CreateExerciseSchema"
import { CREATE_EXERCISE_MUTATION } from "../graphql/mutations/createExercise"
import { EXERCISES_QUERY } from "../graphql/queries/coach/exercises"
import { useMutation } from "@apollo/client"
import { toast } from "react-toastify"
import FormInput from "./FormInput"
import Button from "./Button"

const CreateExerciseForm = ({ onExerciseCreated }) => {
  const navigate = useNavigate()

  const [createExercise] = useMutation(CREATE_EXERCISE_MUTATION, {
    refetchQueries: [
      {
        query: EXERCISES_QUERY,
        variables: {
          first: 3,
          after: null,
          last: null,
          before: null,
          search: ""
        }
      }
    ],
    onError: err => {
      console.error("Error creating the exercise:", err)
      toast.error("Error creating the exercise")
    },
    onCompleted: () => {
      toast.success("Exercise created successfully")
      onExerciseCreated()
      navigate("/exercises")
    }
  })

  const handleSubmit = async values => {
    await createExercise({ variables: { input: values } })
    formik.resetForm()
  }

  const handleFileChange = event => {
    formik.setFieldValue("videoFile", event.currentTarget.files[0])
  }

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      videoFile: null
    },
    validationSchema: CreateExerciseSchema,
    onSubmit: handleSubmit
  })

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col mx-auto mt-12 w-full min-h-96 max-w-[750px] rounded overflow-hidden bg-white">
      <div className="flex flex-col gap-[0.75rem] mb-4 w-full px-10 py-8">
        <FormInput
          id="title"
          label="Título"
          name="title"
          placeholder="Ejercicio de ejemplo"
          error={formik.errors.title}
          touched={formik.touched.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
        <FormInput
          type="textarea"
          id="description"
          label="Descripción"
          name="description"
          placeholder="Descripción del ejercicio"
          error={formik.errors.description}
          touched={formik.touched.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        <div className="mb-4">
          <div className="flex items-center">
            <label
              htmlFor="videoFile"
              className="cursor-pointer bg-slate-950 text-[#a2ffff] px-4 py-2 rounded-lg shadow-md hover:bg-slate-800 hover:text-[#e3ffff] focus:outline-none focus:ring-2 focus:ring-indigo-400 text-balance text-center">
              Seleccionar archivo
            </label>
            <input
              id="videoFile"
              name="videoFile"
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
            <span className="ml-3 text-gray-700">
              {formik.values.videoFile
                ? formik.values.videoFile.name
                : "No file chosen"}
            </span>
          </div>
          {formik.errors.videoFile && formik.touched.videoFile && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.videoFile}
            </p>
          )}
        </div>
      </div>
      <Button type="submit" isLoading={formik.isSubmitting}>
        Crear Ejercicio
      </Button>
    </form>
  )
}

export default CreateExerciseForm
