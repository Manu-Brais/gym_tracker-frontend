import React from "react"
import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { EXERCISE_QUERY } from "../../../graphql/queries/coach/exercise"

function ShowExercise() {
  const { id } = useParams()
  const { loading, error, data } = useQuery(EXERCISE_QUERY, {
    variables: { id }
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const { exercise } = data

  return (
    <>
      <section className="flex flex-col w-[555px] mx-auto p-4 gap-3 justify-between mb-4 border rounded">
        <video
          controls
          src={`http://localhost:3000${exercise.videoUrl}`}
          className="w-full h-auto max-w-lg rounded-md overflow-hidden shadow-lg"
          poster={
            exercise.videoThumbnailUrl
              ? `http://localhost:3000${exercise.videoThumbnailUrl}`
              : null
          }
        />
        <h1 className="text-2xl font-bold mb-4">{exercise.title}</h1>
        <div className="text-pretty mb-4">{exercise.description}</div>
        <a
          onClick={() => window.history.back()}
          className="text-blue-500 cursor-pointer">
          Go back
        </a>
      </section>
    </>
  )
}

export default ShowExercise
