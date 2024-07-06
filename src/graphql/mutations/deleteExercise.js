import { gql } from "@apollo/client"

export const DELETE_EXERCISE_MUTATION = gql`
  mutation deleteExercise($input: DeleteExerciseInput!) {
    deleteExercise(input: $input) {
      success
    }
  }
`
