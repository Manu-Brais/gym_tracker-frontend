import { useEffect, useRef } from "react"
import { useLazyQuery } from "@apollo/client"

const useGraphQLQuery = (query, onCompleted, successNotice, failureAlert) => {
  const [executeQuery, { called, data, error }] = useLazyQuery(query)
  const notifiedRef = useRef(false)

  useEffect(() => {
    if (called && data && !notifiedRef.current) {
      onCompleted(data)
      successNotice?.()
      notifiedRef.current = true
    } else if (called && error && !notifiedRef.current) {
      console.error(error)
      failureAlert ? failureAlert() : toast.error(error.message)
      notifiedRef.current = true
    }
  }, [called, data, error, onCompleted])

  const execute = async variables => {
    try {
      notifiedRef.current = false
      await executeQuery({ variables })
    } catch (e) {
      console.log(e)
    }
  }

  return { execute }
}

export default useGraphQLQuery
