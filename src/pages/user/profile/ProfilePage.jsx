import React, { useState } from "react"
import ProfileForm from "../../../components/ProfileForm"
import { useQuery } from "@apollo/client"
import { Phone, Location, Edit } from "../../../components/Icons"
import Loader from "../../../components/Loader"
import { FETCH_USER_DATA_QUERY } from "../../../graphql/queries/fetchUserData"
import { GET_REFERRAL_TOKEN_QUERY } from "../../../graphql/queries/getReferralToken"

export default function ProfilePage() {
  const [hidden, setHidden] = useState("hidden")
  const [imageLoaded, setImageLoaded] = useState(false)
  const { loading, error, data } = useQuery(FETCH_USER_DATA_QUERY)
  const {
    loading: loadingReferral,
    error: errorReferral,
    data: dataReferral
  } = useQuery(GET_REFERRAL_TOKEN_QUERY)

  const isLoading = loading && !imageLoaded

  if (isLoading) return <Loader />

  if (error) return <p>Error: {error.message}</p>

  const { authenticatable } = data?.fetchUserData
  const { name, surname, phone, address, avatarUrl } = authenticatable || {}
  const referralToken = dataReferral?.getReferral.referralToken

  const handleModal = () => {
    setHidden(hidden === "hidden" ? "" : "hidden")
  }

  return (
    <div className="flex flex-col min-h-screen m-16">
      <div
        className={`absolute right-0 top-0 left-0 bottom-0 bg-gray-900 bg-opacity-50 z-50 ${hidden}`}>
        <div className="relative mt-24 mx-auto w-full bg-white p-8 rounded-lg shadow-lg max-w-[800px] min-w-[400px]">
          <button
            className="absolute top-2 right-2 text-2xl text-gray-500 mr-2"
            onClick={handleModal}>
            &times;
          </button>
          <ProfileForm />
        </div>
      </div>

      <section className="flex">
        <div
          className={`flex-shrink-0 w-56 h-56 bg${
            imageLoaded ? "-transparent" : "-gray-200"
          }`}>
          <img
            src={`http://localhost:3000${avatarUrl}`}
            alt="Profile"
            className="w-56 h-56 rounded-lg object-cover shadow-slate-700 shadow"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <div className="flex flex-col justify-center gap-4 ml-8">
          <p className="flex gap-6 justify-start items-center text-3xl font-semibold">
            {name} {surname}
            <button
              className="rounded-full bg-gray-100 p-2 shadow shadow-slate-400 hover:bg-slate-200 hover:cursor-pointer active:bg-slate-300 active:shadow-inner transition-all duration-200"
              onClick={handleModal}>
              <Edit className="w-4 h-4 text-gray-700" />
            </button>
          </p>
          <p className="flex gap-2 text-xl font-thin text-gray-700">
            <Phone className="w-6 h-6 text-gray-500" />
            {phone}
          </p>
          <p className="flex gap-2 text-xl font-thin text-gray-700">
            <Location className="w-6 h-6 text-gray-500" />
            {address}
          </p>
          <p className="text-xl font-thin text-gray-700">
            <span className="text-gray-500">Referral Link:</span>{" "}
            <span className="text-blue-500 underline hover:text-blue-700 hover:cursor-pointer">
              {`https://www.gym-trackr/signup?referral=${referralToken}`}
            </span>
          </p>
        </div>
      </section>
    </div>
  )
}
