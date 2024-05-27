import { useEffect, useRef } from "react"
import { toast } from "react-toastify"
import { useMutation } from "@apollo/client"

const useGraphQLMutation = (mutation, onCompleted) => {
  const [executeMutation, { called, data, error }] = useMutation(mutation)
  const notifiedRef = useRef(false)

  useEffect(() => {
    if (called && data && !notifiedRef.current) {
      toast.success("Benvido!")
      onCompleted(data)
      notifiedRef.current = true
    } else if (called && error && !notifiedRef.current) {
      toast.error(error.message)
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
