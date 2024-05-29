import React, { useState } from "react"
import Button from "./Button"
import useGraphQLQuery from "../hooks/useGraphQlQuery"
import { GET_REFERRAL_TOKEN_QUERY } from "../graphql/queries/getReferralToken"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

export default function GenerateReferralLink() {
  const [token, setToken] = useState("")

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
    const token = data.getReferral.referralToken
    setToken(token)
  }

  return (
    <div>
      <h1>GenerateReferralLink</h1>
      <Button onClick={handleSubmit}>Obter Referral</Button>
      <div>
        <Link to={`/signup?referral=${token}`}>
          <h1>Rexistrarse como cliente</h1>
          <Button>{`/signup?referral=${token}`}</Button>
        </Link>
      </div>
    </div>
  )
}
