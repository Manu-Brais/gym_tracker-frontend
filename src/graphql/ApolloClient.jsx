import Cookies from "js-cookie"
import { setContext } from "@apollo/client/link/context"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import createUploadLink from "apollo-upload-client/createUploadLink.mjs"

// TODO - move this URI to a .env file
// const httpLink = new createHttpLink({ uri: "http://localhost:3000/graphql" })
const httpLink = createUploadLink({ uri: "http://localhost:3000/graphql" })

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get("gt-token")

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

export default client
