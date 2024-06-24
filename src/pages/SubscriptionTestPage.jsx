import React from "react"
import { useSubscription, gql } from "@apollo/client"
import ExerciseCard from "../components/ExerciseCard"

export default function SubscriptionTestPage() {
  const EXERCISE_STATUS_CHANGED_SUBSCRIPTION = gql`
    subscription exerciseStatusChanged($exerciseId: ID!) {
      exerciseStatusChanged(exerciseId: $exerciseId) {
        exercise {
          id
          videoStatus
          videoUrl
        }
      }
    }
  `
  const { data, loading } = useSubscription(
    EXERCISE_STATUS_CHANGED_SUBSCRIPTION,
    { variables: { exerciseId: "b283df14-ee6e-446d-80dd-bd3c8dd60e96" } }
  )
  if (loading) return <h4>Loading...</h4>
  if (data)
    return (
      <ExerciseCard
        exerciseId={data.exerciseStatusChanged.exercise.id}
        videoStatus={data.exerciseStatusChanged.exercise.videoStatus}
        videoUrl={`http://localhost:3000/${data.exerciseStatusChanged.exercise.videoUrl}`}
        title="Test title"
        description="Test description"
      />
    )
  return <h4>New comment:</h4>
}
