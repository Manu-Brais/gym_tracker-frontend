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
    <div className="h-full w-full flex justify-center items-center">
      <section className="flex flex-col w-[555px] mx-auto p-4 gap-3 justify-between mb-4 border rounded">
        <div className="w-full relative pt-[56.25%]">
          <video
            controls
            src={`http://localhost:3000${exercise.videoUrl}`}
            className="absolute top-0 left-0 w-full h-full rounded-md object-cover shadow-lg"
            poster={
              exercise.videoThumbnailUrl
                ? `http://localhost:3000${exercise.videoThumbnailUrl}`
                : null
            }
          />
        </div>
        <h1 className="text-2xl font-bold mb-4">{exercise.title}</h1>
        <div className="text-pretty mb-4">{exercise.description}</div>
        <a
          onClick={() => window.history.back()}
          className="text-blue-500 cursor-pointer">
          Go back
        </a>
      </section>
    </div>
  )
}

export default ShowExercise
