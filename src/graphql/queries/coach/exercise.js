import { gql } from "@apollo/client"

export const EXERCISE_QUERY = gql`
  query GetExercise($id: ID!) {
    exercise(id: $id) {
      id
      title
      description
      videoUrl
      videoThumbnailUrl
    }
  }
`
