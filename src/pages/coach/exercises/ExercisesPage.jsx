import React from "react"
import ExerciseCard from "../../../components/ExerciseCard"
import { EXERCISES_QUERY } from "../../../graphql/queries/coach/exercises"
import { useQuery } from "@apollo/client"

export default function ExercisesPage() {
  const { loading, error, data } = useQuery(EXERCISES_QUERY, {
    fetchPolicy: "network-only"
  })

  if (error) return <p>Error: {error.message}</p>

  const { exercises } = data || {}

  return (
    <div className="container mx-auto px-4 mt-9 mb-24">
      <h1 className="text-2xl font-bold mb-4">Exercises</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading...</p> {/*  */}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {exercises.map((exercise, key) => (
            <div key={key}>
              <ExerciseCard
                videoStatus={exercise.videoStatus}
                videoUrl={`http://localhost:3000/${exercise.videoUrl}`}
                title={exercise.title}
                description={exercise.description}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
