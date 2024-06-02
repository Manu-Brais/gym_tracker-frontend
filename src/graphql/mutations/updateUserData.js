import { gql } from "@apollo/client"

export const UPDATE_USER_DATA_MUTATION = gql`
  mutation updateUserData($input: UpdateUserDataInput!) {
    updateUserData(input: $input) {
      userData {
        authenticatable {
          ... on Coach {
            id
            name
            surname
            phone
            address
          }
          ... on Client {
            id
            name
            surname
            phone
            address
          }
        }
      }
    }
  }
`

