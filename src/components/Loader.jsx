import { RotatingLines } from "react-loader-spinner"

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-96">
      <RotatingLines
        width={30}
        height={30}
        strokeColor="black"
        strokeWidth="5"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  )
}
