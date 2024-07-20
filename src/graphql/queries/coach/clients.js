import { gql } from "@apollo/client"

export const GET_CLIENTS_QUERY = gql`
  query GetClients(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $search: String
  ) {
    clients(
      first: $first
      after: $after
      last: $last
      before: $before
      search: $search
    ) {
      edges {
        node {
          id
          address
          avatarUrl
          name
          phone
          surname
          email
          createdAt
        }
      }
    }
  }
`
