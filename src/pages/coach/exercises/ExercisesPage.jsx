import React from "react"
import { useLoaderData } from "react-router-dom"
import ShowVideoComponent from "../../../components/ShowVideoComponent"

export default function ExercisesPage() {
  const { exercises } = useLoaderData()
  console.log(exercises)

  return (
    <div className="container mx-auto px-4 mt-9 mb-24">
      <h1 className="text-2xl font-bold mb-4">Exercises</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {exercises.map(exercise => (
          <div key={exercise.id}>
            <ShowVideoComponent
              videoUrl={`http://localhost:3000/${exercise.videoUrl}`}
              title={exercise.title}
              description={exercise.description}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
