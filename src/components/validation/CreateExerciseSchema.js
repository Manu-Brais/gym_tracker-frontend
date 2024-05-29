import * as Yup from "yup"

export const CreateExerciseSchema = Yup.object().shape({
  title: Yup.string().required("El título es requerido"),
  description: Yup.string(),
  videoFile: Yup.mixed().required("El archivo de video es requerido")
})
