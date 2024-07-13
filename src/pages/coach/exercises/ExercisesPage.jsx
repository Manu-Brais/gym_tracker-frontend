import React, { useState, useCallback, useEffect } from "react"
import { useQuery } from "@apollo/client"
import ExerciseTable from "../../../components/ExerciseTable"
import debounce from "lodash.debounce"
import { RightArrow, LeftArrow } from "../../../components/Icons"
import CreateExerciseForm from "../../../components/CreateExerciseForm"
import { EXERCISES_QUERY } from "../../../graphql/queries/coach/exercises"

// TODO: define this constant in a shared file
// in order to use the same ITEMS_PER_PAGE on each
// component that needs it
const ITEMS_PER_PAGE = 5
const DEBOUNCE_DELAY = 300

export default function ExercisesPage() {
  const savedPage = parseInt(localStorage.getItem("currentPage"), 10) || 1
  const [currentPage, setCurrentPage] = useState(savedPage)
  const [hidden, setHidden] = useState("hidden")
  const { loading, error, data, fetchMore } = useQuery(EXERCISES_QUERY, {
    variables: {
      first: ITEMS_PER_PAGE,
      after: null,
      last: null,
      before: null,
      search: ""
    }
  })

  if (error) return <p>Error: {error.message}</p>

  const { exercises } = data || {}
  const edges = exercises?.edges || []
  const pageInfo = exercises?.pageInfo || {}
  const totalCount = exercises?.totalCount || 0

  // This function is debounced to avoid making a request on every keystroke
  const debouncedFetchMore = useCallback(
    debounce(value => {
      fetchMore({
        variables: {
          first: ITEMS_PER_PAGE,
          after: null,
          before: null,
          last: null,
          search: value
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev
          setCurrentPage(1)
          return fetchMoreResult
        }
      })
    }, DEBOUNCE_DELAY),
    []
  )

  const handleSearch = event => {
    debouncedFetchMore(event.target.value)
  }

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

  const handleModal = () => {
    setHidden(hidden === "hidden" ? "" : "hidden")
  }

  const handleExerciseMutation = () => {
    setCurrentPage(1)
    fetchMore({
      first: ITEMS_PER_PAGE,
      after: null,
      last: null,
      before: null,
      search: ""
    })
  }

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage)
  }, [currentPage])

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
          <div
            className={`absolute right-0 top-0 left-0 bottom-0 bg-gray-900 bg-opacity-50 z-50 ${hidden}`}>
            <div className="relative mt-24 mx-auto w-full bg-white p-8 rounded-lg shadow-lg max-w-[800px] min-w-[400px]">
              <h2 className="text-2xl font-bold mb-4">Create Exercise</h2>
              <button
                className="absolute top-2 right-2 text-2xl text-gray-500 mr-2"
                onClick={handleModal}>
                &times;
              </button>
              <CreateExerciseForm onExerciseCreated={handleExerciseMutation} />
            </div>
          </div>
          <section className="flex justify-between items-center mb-4 gap-4">
            <input
              type="search"
              className="w-2/3 border border-gray-100 px-4 py-2 mb-4 rounded"
              placeholder="Search exercises"
              onChange={handleSearch}
            />
            <div className="grow flex justify-between items-center mb-4 gap-2">
              <button
                className="rounded p-2 ml-4 bg-slate-100 text-green-800 shadow hover:bg-slate-200 hover:cursor-pointer active:bg-slate-300 active:shadow-inner transition-all duration-200"
                onClick={handleModal}>
                Create Exercise
              </button>
              <div className="flex gap-3">
                <button
                  className="rounded-full bg-slate-100 w-fit h-fit p-2 shadow hover:bg-slate-200 hover:cursor-pointer active:bg-slate-300 active:shadow-inner transition-all duration-200"
                  onClick={handlePreviousPage}
                  disabled={!pageInfo.hasPreviousPage}>
                  <LeftArrow className="w-7 text-black" />
                </button>
                <button
                  className="rounded-full bg-slate-100 w-fit h-fit p-2 shadow hover:bg-slate-200 hover:cursor-pointer active:bg-slate-300 active:shadow-inner transition-all duration-200"
                  onClick={handleNextPage}
                  disabled={!pageInfo.hasNextPage}>
                  <RightArrow className="w-7 text-black" />
                </button>
              </div>
            </div>
          </section>
          <ExerciseTable
            exercises={edges}
            onExerciseDeleted={handleExerciseMutation}
            ITEMS_PER_PAGE={ITEMS_PER_PAGE}
          />
          <div className="flex justify-end items-center mt-4 mr-2">
            <span className="text-xs font-thin text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
          </div>
        </>
      )}
    </div>
  )
}
