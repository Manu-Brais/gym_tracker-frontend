import { gql } from "@apollo/client"

export const GENERATE_REFERRAL_TOKEN = gql`
  mutation generateReferalToken($input: GenerateJwtInput!) {
    generateReferalToken(input: $input) {
      referalToken
    }
  }
`
