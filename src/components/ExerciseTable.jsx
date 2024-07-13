import React from "react"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@apollo/client"
import { toast } from "react-toastify"
import { DELETE_EXERCISE_MUTATION } from "../graphql/mutations/deleteExercise"
import { EXERCISES_QUERY } from "../graphql/queries/coach/exercises"

function ExerciseTable({ exercises, onExerciseDeleted, ITEMS_PER_PAGE }) {
  const navigate = useNavigate()

  // TODO: Improve the exercise deletion process
  // - update the currentPage number state when deleting an exercise
  const [deleteExercise] = useMutation(DELETE_EXERCISE_MUTATION, {
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
      console.error("Error deleting exercise:", err)
      toast.error("Error deleting exercise")
    },
    onCompleted: () => {
      toast.success("Exercise deleted successfully")
      onExerciseDeleted()
    }
  })

  const handleDeleteExercise = id => {
    if (confirm("Are you sure you want to delete this exercise?")) {
      deleteExercise({ variables: { input: { id } } })
    }
  }

  return (
    <table className="w-full border-collapse rounded overflow-hidden shadow-sm">
      <caption className="hidden">Exercises list</caption>
      <thead className="bg-gray-100 border-collapse text-left">
        <tr className="border-collapse">
          <th className="w-2/6 max-w-12 px-8 py-4">Title</th>
          <th className="w-3/6 px-8 py-4">Description</th>
          <th className="w-1/6 px-8 py-4 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {exercises.map(({ node: exercise }, key) => (
          <tr key={key} className="even:bg-gray-50 border-collapse">
            <td className="max-w-12 w-2/6 px-8 py-4 truncate overflow-ellipsis whitespace-nowrap">
              {exercise.title}
            </td>
            <td className="max-w-16 w-3/6 px-8 py-4 truncate overflow-ellipsis whitespace-nowrap">
              {exercise.description}
            </td>
            <td className="px-8 py-4 flex justify-evenly">
              <div className="mr-2">
                <button
                  className="text-blue-500"
                  id={exercise.id}
                  onClick={() => navigate(`/exercises/${exercise.id}`)}>
                  Details
                </button>
              </div>
              <div className="mr-2">
                <button
                  className="text-red-500"
                  id={exercise.id}
                  onClick={() => handleDeleteExercise(exercise.id)}>
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
        {exercises.length < ITEMS_PER_PAGE &&
          [...Array(ITEMS_PER_PAGE - exercises.length)].map((_, index) => (
            <tr key={`placeholder-${index}`} className="even:bg-gray-50">
              <td className="w-2/6 max-w-12 px-8 py-4">&nbsp;</td>
              <td className="w-3/6 px-8 py-4">&nbsp;</td>
              <td className="w-1/6 px-8 py-4">&nbsp;</td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}

export default ExerciseTable
