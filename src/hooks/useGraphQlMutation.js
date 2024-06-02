import { useEffect, useRef } from "react"
import { useMutation } from "@apollo/client"
import { toast } from "react-toastify"

const useGraphQLMutation = (
  mutation,
  onCompleted,
  successNotice,
  failureAlert
) => {
  const [executeMutation, { called, data, error }] = useMutation(mutation)
  const notifiedRef = useRef(false)

  useEffect(() => {
    if (called && data && !notifiedRef.current) {
      successNotice()
      onCompleted(data)
      notifiedRef.current = true
    } else if (called && error && !notifiedRef.current) {
      failureAlert ? failureAlert() : toast.error(error.message)
      notifiedRef.current = true
    }
  }, [called, data, error, onCompleted])

  const execute = async variables => {
    try {
      notifiedRef.current = false
      await executeMutation({ variables })
    } catch (e) {
      console.log(e)
    }
  }

  return { execute }
}

export default useGraphQLMutation
