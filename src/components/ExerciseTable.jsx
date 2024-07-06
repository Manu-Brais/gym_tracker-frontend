import React from "react"
import { useNavigate } from "react-router-dom"

function ExerciseTable({ exercises, ITEMS_PER_PAGE }) {
  const navigate = useNavigate()

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
                  onClick={() => {
                    alert(`Delete exercise ${exercise.id}`)
                  }}>
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
