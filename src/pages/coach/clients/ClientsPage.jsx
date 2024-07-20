import React, { useState, useCallback, useEffect } from "react"
import { useQuery } from "@apollo/client"
import ClientsTable from "../../../components/ClientsTable"
import debounce from "lodash.debounce"
import { RightArrow, LeftArrow } from "../../../components/Icons"
import Loader from "../../../components/Loader"
import { GET_CLIENTS_QUERY } from "../../../graphql/queries/coach/clients"

// TODO: define this constant in a shared file
// in order to use the same ITEMS_PER_PAGE on each
// component that needs it
const ITEMS_PER_PAGE = 5
const DEBOUNCE_DELAY = 300

export default function ClientsPage() {
  const savedPage = parseInt(localStorage.getItem("currentPage"), 10) || 1
  const [currentPage, setCurrentPage] = useState(savedPage)
  //   const [hidden, setHidden] = useState("hidden")
  const { loading, error, data, fetchMore } = useQuery(GET_CLIENTS_QUERY, {
    variables: {
      first: ITEMS_PER_PAGE,
      after: null,
      last: null,
      before: null,
      search: ""
    }
  })

  const { clients } = data || {}
  const edges = clients?.edges || []
  const pageInfo = clients?.pageInfo || {}
  const totalCount = clients?.totalCount || 0

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

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage)
  }, [currentPage])

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)
  if (error) return <p>Error: {error.message}</p>
  if (loading) return <Loader />

  return (
    <div className="container mt-9 mb-24">
      <h1 className="text-2xl font-bold mb-4">Clients</h1>
      <section className="flex justify-between items-center mb-4 gap-4 w-full">
        <input
          type="search"
          className="w-2/3 border border-gray-100 px-4 py-2 mb-4 rounded"
          placeholder="Search clients"
          onChange={handleSearch}
        />
        <div className="grow flex justify-end items-center mb-4 gap-2">
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
      <ClientsTable
        clients={edges}
        // onClientsDeleted={handleClientsMutation}
        ITEMS_PER_PAGE={ITEMS_PER_PAGE}
      />
      <div className="flex justify-end items-center mt-4 mr-2">
        <span className="text-xs font-thin text-gray-400">
          Page {currentPage} of {totalPages}
        </span>
      </div>
    </div>
  )
}
