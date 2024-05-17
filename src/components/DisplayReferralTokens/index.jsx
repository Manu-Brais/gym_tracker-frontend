import { useState } from "react"
import { useMutation } from "@apollo/client"
import { GENERATE_REFERRAL_TOKEN } from "../../graphql/mutations/generateReferralToken"
import styles from "./DisplayReferralTokens.module.css"

function DisplayReferralTokens() {
  const [expiration, setExpiration] = useState(null)
  const [clientMutationId, setClientMutationId] = useState(null)
  const [generateReferalToken, { data, loading, error }] = useMutation(
    GENERATE_REFERRAL_TOKEN
  )

  const handleGenerateToken = async () => {
    try {
      const result = await generateReferalToken({
        variables: {
          input: {
            clientMutationId,
            expiration: expiration ? parseInt(expiration) : null
          }
        }
      })
      console.log(
        "Referral Token:",
        result.data.generateReferalToken.referalToken
      )
    } catch (e) {
      console.error("Error generating referral token:", e)
    }
  }

  return (
    <div
      style={{
        margin: "20px",
        padding: "20px",
        border: "1px solid black",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        borderRadius: "8px",
        width: "400px",
        height: "230px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
      }}>
      <input
        type="number"
        value={expiration || ""}
        onChange={e => setExpiration(e.target.value)}
        placeholder="Expiration (optional)"
      />
      <button
        onClick={handleGenerateToken}
        disabled={loading}
        className={`${loading ? "loading" : ""} ${styles.button}`}>
        Generate Referral Token
      </button>
      <div className={styles.result}>
        {loading && <p>Loading...</p>}
        {error && <p className="error">Error: {error.message}</p>}
        {data && `${data.generateReferalToken.referalToken}`}
      </div>
    </div>
  )
}

export default DisplayReferralTokens
