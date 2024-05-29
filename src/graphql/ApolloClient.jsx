import Cookies from "js-cookie"
import { setContext } from "@apollo/client/link/context"
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client"

// TODO - move this URI to a .env file
const httpLink = new createHttpLink({ uri: "http://localhost:3000/graphql" })

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get("token")

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export const ApolloWrapper = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
)
