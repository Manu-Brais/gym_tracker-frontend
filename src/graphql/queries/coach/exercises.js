import { gql } from "@apollo/client"

export const EXERCISES_QUERY = gql`
  query exercises {
    exercises {
      description
      title
      videoStatus
      videoUrl
    }
  }
`
