import { gql } from "@apollo/client"

export const FETCH_USER_DATA_QUERY = gql`
  query fetchUserData {
    fetchUserData {
      email
      type
      authenticatable {
        ... on Coach {
          id
          name
          surname
          phone
          address
          avatarUrl
        }
        ... on Client {
          id
          name
          surname
          phone
          address
          avatarUrl
        }
      }
    }
  }
`
