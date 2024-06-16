export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center text-gray-800">
      <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong 😧</h1>
      <p className="text-2xl text-gray-600">404 - Page not found</p>
      <button
        onClick={() => window.history.back()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
        Go back
      </button>
    </div>
  )
}
