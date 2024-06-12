import React from "react"

const ShowVideoComponent = ({ videoUrl, title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto mt-8 h-[28rem]">
      {videoUrl ? (
        <div className="w-full h-full flex flex-col">
          <h1 className="text-3xl font-bold text-center mb-4 h-[10%]">
            {title}
          </h1>
          <div className="relative h-[50%]">
            <video
              className="w-full h-full rounded-lg shadow-md object-cover"
              controls
              //   autoPlay
              muted
              loop>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <p className="text-gray-700 text-center mt-4 h-[40%] overflow-hidden text-ellipsis">
            {description.length > 200
              ? `${description.substring(0, 200)}...`
              : description}
          </p>
        </div>
      ) : (
        <p className="text-red-500">No video available</p>
      )}
    </div>
  )
}

export default ShowVideoComponent
