import { gql } from "@apollo/client"

export const CREATE_EXERCISE_MUTATION = gql`
  mutation createExercise($input: CreateExerciseInput!) {
    createExercise(input: $input) {
      exercise {
        title
        description
        videoStatus
        videoUrl
      }
    }
  }
`
