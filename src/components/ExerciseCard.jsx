import React, { useEffect, useState } from "react"

const ExerciseCard = ({ videoStatus, videoUrl, title, description }) => {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (videoStatus === "processing") {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [videoStatus])

  return (
    <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto mt-8 h-[28rem]">
      <h1 className="text-3xl font-bold text-center mb-4 h-[10%]">{title}</h1>
      <div className="relative h-[50%] w-full">
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center bg-black bg-opacity-20 rounded-md">
            <p className="text-pretty italic font-thin text-gray-800">
              Processing video
            </p>
            <svg
              className="animate-spin -ml-1 mr-3 h-10 w-h-10 text-gray-800"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <video
            className="w-full h-full object-cover rounded-lg"
            controls
            src={videoUrl}
            type="video/mp4"
          />
        )}
      </div>
      <p className="text-gray-700 text-center mt-4 h-[40%] overflow-hidden text-ellipsis">
        {description.length > 200
          ? `${description.substring(0, 200)}...`
          : description}
      </p>
    </div>
  )
}

export default ExerciseCard
