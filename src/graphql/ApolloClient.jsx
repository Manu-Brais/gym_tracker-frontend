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
  const token = localStorage.getItem("token")

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
