import React, { useState, useEffect } from "react"
import { useQuery } from "@apollo/client"
import { EXERCISES_QUERY } from "../../../graphql/queries/coach/exercises"
import ExerciseTable from "../../../components/ExerciseTable"

export default function ExercisesPage() {
  const ITEMS_PER_PAGE = 10
  const [currentPage, setCurrentPage] = useState(1)

  const { loading, error, data, fetchMore } = useQuery(EXERCISES_QUERY, {
    variables: { first: ITEMS_PER_PAGE, after: null, last: null, before: null },
    fetchPolicy: "network-only"
  })

  if (error) return <p>Error: {error.message}</p>

  const { exercises } = data || {}
  const edges = exercises?.edges || []
  const pageInfo = exercises?.pageInfo || {}
  const totalCount = exercises?.totalCount || 0

  const handleNextPage = () => {
    fetchMore({
      variables: {
        first: ITEMS_PER_PAGE,
        after: pageInfo.endCursor,
        before: null,
        last: null
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        setCurrentPage(currentPage + 1)
        return fetchMoreResult
      }
    })
  }

  const handlePreviousPage = () => {
    console.log("startCursor (handlePrevious)", pageInfo.startCursor)
    fetchMore({
      variables: {
        after: null,
        first: null,
        before: pageInfo.startCursor,
        last: ITEMS_PER_PAGE
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        setCurrentPage(currentPage - 1)
        return fetchMoreResult
      }
    })
  }

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  return (
    <div className="container mx-auto px-4 mt-9 mb-24">
      <h1 className="text-2xl font-bold mb-4">Exercises</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <section className="flex justify-between items-center mb-4 gap-4">
            <input
              type="search"
              className="w-2/3 border border-gray-100 px-4 py-2 mb-4 rounded"
              placeholder="Search exercises"
            />
            <div className="grow flex justify-center mb-4 gap-2">
              <button
                className="rounded p-2 w-24 bg-slate-100 text-blue-500"
                onClick={handlePreviousPage}
                disabled={!pageInfo.hasPreviousPage}>
                Previous
              </button>
              <button
                className="rounded p-2 w-24 bg-slate-100 text-blue-500"
                onClick={handleNextPage}
                disabled={!pageInfo.hasNextPage}>
                Next
              </button>
            </div>
            <div>
              <span className="text-xs font-thin">
                Page {currentPage} of {totalPages}
              </span>
            </div>
          </section>
          <ExerciseTable exercises={edges} ITEMS_PER_PAGE={ITEMS_PER_PAGE} />
        </>
      )}
    </div>
  )
}
