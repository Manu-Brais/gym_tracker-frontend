import { gql } from "@apollo/client"

export const GET_REFERRAL_TOKEN_QUERY = gql`
  query referral {
    getReferral {
      referralToken
    }
  }
`
