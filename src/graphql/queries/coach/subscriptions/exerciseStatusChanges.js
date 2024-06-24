import { gql } from "@apollo/client"

export const EXERCISE_STATUS_CHANGED_SUBSCRIPTION = gql`
  subscription OnExerciseStatusChanged($exerciseId: ID!) {
    exerciseStatusChanged(exerciseId: $exerciseId) {
      exercise {
        id
        title
        description
        videoStatus
        videoUrl
      }
    }
  }
`
