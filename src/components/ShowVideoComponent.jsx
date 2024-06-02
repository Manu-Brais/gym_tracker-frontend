import React from "react"

// This component is only for testing purposes, remember to modify the videoUrl prop and use it in the video tag
const ShowVideoComponent = ({ videoUrl }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-6 rounded-lg shadow-lg">
      {/* This is for testing purposes remember to modify the videoUrl prop and use
      it in the video tag */}
      {true ? (
        <div className="w-full max-w-2xl">
          <video className="w-full h-auto rounded-lg shadow-md" controls>
            <source
              src="http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6NSwicHVyIjoiYmxvYl9pZCJ9fQ==--c618e80f36f9cac7d4ef31b171a9628f4895f23b/speciesism_en.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <p className="text-red-500">No video available</p>
      )}
    </div>
  )
}

export default ShowVideoComponent
