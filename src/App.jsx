import React from "react"
import SignUpForm from "./components/signUpForm.jsx"
import styled from "styled-components"
import DisplayReferralTokens from "./components/DisplayReferralTokens/index.jsx"

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 100vh;
  width: 100vw;
`

export default function App() {
  return (
    <Layout>
      <section className={"hola"}>
        <SignUpForm />
        <DisplayReferralTokens />
      </section>
    </Layout>
  )
}
