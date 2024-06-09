import React, { useState } from "react"
import Button from "./Button"
import useGraphQLQuery from "../hooks/useGraphQlQuery"
import { GET_REFERRAL_TOKEN_QUERY } from "../graphql/queries/getReferralToken"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

export default function GenerateReferralLink() {
  const [referralToken, setReferralToken] = useState("")

  const { execute } = useGraphQLQuery(
    GET_REFERRAL_TOKEN_QUERY,
    data => onCompleted(data),
    () => toast.success("Referral obtido com éxito"),
    () => toast.error("Erro ao obter o referral")
  )

  const handleSubmit = async () => {
    await execute()
  }

  const onCompleted = data => {
    const referralToken = data.getReferral.referralToken
    setReferralToken(referralToken)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h1>GenerateReferralLink</h1>
      <button
        onClick={handleSubmit}
        className="w-48 h-12 bg-blue-500 text-white rounded-md">
        Generate Referral Link
      </button>
      <div>
        {referralToken && (
          <>
            <h1>Here is your referral link:</h1>
            <Link
              to={`/signup?referral=${referralToken}`}
              className="text-blue-500 hover:underline text-lg">
              {`https://www.gym-trackr/signup?referral=${referralToken}`}
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
