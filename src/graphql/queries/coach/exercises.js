import { gql } from "@apollo/client"

export const EXERCISES_QUERY = gql`
  query GetExercises($first: Int, $after: String, $last: Int, $before: String) {
    exercises(first: $first, after: $after, last: $last, before: $before) {
      edges {
        node {
          id
          title
          description
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
  }
`
