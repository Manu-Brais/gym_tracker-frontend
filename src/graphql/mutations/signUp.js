import { gql } from "@apollo/client"

export const SIGN_UP_MUTATION = gql`
  mutation signUp($input: SignUpInput!) {
    signup(input: $input) {
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
      token
    }
  }
`
