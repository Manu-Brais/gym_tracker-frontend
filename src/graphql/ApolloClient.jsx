import Cookies from "js-cookie"
import { setContext } from "@apollo/client/link/context"
import ActionCableLink from "graphql-ruby-client/subscriptions/ActionCableLink"
import createUploadLink from "apollo-upload-client/createUploadLink.mjs"
import { createConsumer } from "@rails/actioncable"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink
} from "@apollo/client"

const cable = createConsumer("ws://localhost:3000/cable")
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

const hasSubscriptionOperation = ({ query: { definitions } }) => {
  return definitions.some(
    ({ kind, operation }) =>
      kind === "OperationDefinition" && operation === "subscription"
  )
}

const link = ApolloLink.split(
  hasSubscriptionOperation,
  new ActionCableLink({ cable }),
  httpLink
)

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache()
})

export const ApolloWrapper = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
)

export default client
