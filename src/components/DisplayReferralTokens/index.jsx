import { useState } from "react"
import { useMutation } from "@apollo/client"
import { GENERATE_REFERRAL_TOKEN } from "../../graphql/mutations/generateReferralToken"
import { toast } from "react-toastify"
import styles from "./DisplayReferralTokens.module.css"

function DisplayReferralTokens() {
  const [expiration, setExpiration] = useState(null)
  const [generateReferalToken, { data, loading, error }] = useMutation(
    GENERATE_REFERRAL_TOKEN
  )

  const handleGenerateToken = () => {
    if (!localStorage.getItem("token")) {
      toast.error("Test que loguearte para poder executar esta acción")
      return
    }

    generateReferalToken({
      variables: {
        input: {
          clientMutationId,
          expiration: expiration ? parseInt(expiration) : null
        }
      }
    })
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
