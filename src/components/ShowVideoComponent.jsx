import React from "react"

const ShowVideoComponent = ({ videoUrl, title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto mt-8">
      {videoUrl ? (
        <div className="w-full">
          <h1 className="text-3xl font-bold text-center mb-4">{title}</h1>
          <div className="relative pb-9/16">
            <video
              className="w-full h-auto rounded-lg shadow-md"
              autoPlay
              muted
              loop>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <p className="text-gray-700 text-center mt-4">{description}</p>
        </div>
      ) : (
        <p className="text-red-500">No video available</p>
      )}
    </div>
  )
}

export default ShowVideoComponent
