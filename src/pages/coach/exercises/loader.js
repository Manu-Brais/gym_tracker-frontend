import client from "../../../graphql/ApolloClient"
import { EXERCISES_QUERY } from "../../../graphql/queries/coach/exercises"

export const loader = async () => {
  const { data } = await client.query({ query: EXERCISES_QUERY })

  return { exercises: data.exercises }
}
