import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql
} from "@apollo/client"
import { ApolloLink, concat } from "apollo-link"
import { HttpLink } from "apollo-link-http"

// We have to remember to move this URI to a .env file
const httpLink = new HttpLink({ uri: "http://localhost:3000/graphql" })

const authMiddleware = new ApolloLink((operation, forward) => {
  //   const token = "BEARER TOKEN (WE HAVE TO DINAMICALLY INSERT THIS TOKEN)"
  const token =
    "eyJhbGciOiJFUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ2YWxpZF9mb3IiOiJhdXRoZW50aWNhdGlvbiIsImV4cCI6MTcxNjA2MzI4NX0.8g-sQ8JhTtiu8ZHB3BF2uZQLKP0B7soLK-DD_gtBVe89mBrxBH6dkKZ3q9vPCJTjr9bJ_XRjwMBLfaI2Xz03_A"

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ""
    }
  })

  return forward(operation)
})

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache()
})

export const ApolloWrapper = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
)
