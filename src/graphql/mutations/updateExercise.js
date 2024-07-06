import { gql } from "@apollo/client"

export const UPDATE_EXERCISE_MUTATION = gql`
  mutation updateExercise($input: UpdateExerciseInput!) {
    updateExercise(input: $input) {
      exercise {
        title
        description
        videoStatus
        videoUrl
      }
    }
  }
`
