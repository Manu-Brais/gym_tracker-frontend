import { gql } from "@apollo/client"

export const LOG_IN_MUTATION = gql`
  mutation login($input: LogInInput!) {
    login(input: $input) {
      token
      user {
        id
        email
        authenticatable {
          ... on Client {
            address
            id
            name
            phone
            surname
          }
          ... on Coach {
            address
            id
            name
            phone
            surname
          }
        }
      }
    }
  }
`
