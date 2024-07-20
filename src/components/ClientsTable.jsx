import React from "react"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@apollo/client"
import { toast } from "react-toastify"
// import { DELETE_client_MUTATION } from "../graphql/mutations/deleteclient"
import { GET_CLIENTS_QUERY } from "../graphql/queries/coach/clients"

function ClientsTable({ clients, onClientDeleted, ITEMS_PER_PAGE }) {
  const navigate = useNavigate()

  // TODO: Improve the client deletion process
  // - update the currentPage number state when deleting an client
  //   const [deleteclient] = useMutation(DELETE_client_MUTATION, {
  //     refetchQueries: [
  //       {
  //         query: clients_QUERY,
  //         variables: {
  //           first: 3,
  //           after: null,
  //           last: null,
  //           before: null,
  //           search: ""
  //         }
  //       }
  //     ],
  //     onError: err => {
  //       console.error("Error deleting client:", err)
  //       toast.error("Error deleting client")
  //     },
  //     onCompleted: () => {
  //       toast.success("client deleted successfully")
  //       onClientDeleted()
  //     }
  //   })

  //   const handleDeleteClient = id => {
  //     if (confirm("Are you sure you want to delete this client?")) {
  //       deleteclient({ variables: { input: { id } } })
  //     }
  //   }

  return (
    <table className="w-full border-collapse rounded overflow-hidden shadow-sm">
      <caption className="hidden">Clients list</caption>
      <thead className="bg-gray-100 border-collapse text-left w-full text-pretty text-lg">
        <tr className="border-collapse">
          <th className="w-[6%] py-4"></th>
          <th className="w-[10%] px-4 py-4">Name</th>
          <th className="w-[14%] px-4 py-4">Surname</th>
          <th className="w-[25%] px-4 py-4">Email</th>
          <th className="w-[25%] px-4 py-4">Start date</th>
          <th className="w-[10%] py-4 text-center">Actions</th>
        </tr>
      </thead>
      <tbody className="w-full h-full">
        {clients.map(({ node: client }, key) => (
          <tr
            key={key}
            className="even:bg-gray-50 border-collapse h-20 text-pretty text-lg font-thin">
            <td className="px-3 py-3 truncate overflow-ellipsis whitespace-nowrap">
              {/* The image will not decrease its size */}
              <img
                className="w-20 h-20 rounded object-cover min-w-[80px] min-h-[80px]"
                src={
                  client.avatarUrl
                    ? `http://localhost:3000${client.avatarUrl}`
                    : "http://localhost:4000/avatar_placeholder.png"
                }
                alt={client.name}
              />
            </td>
            <td className="px-4 truncate overflow-ellipsis whitespace-nowrap">
              {client.name}
            </td>
            <td className="px-4 truncate overflow-ellipsis whitespace-nowrap">
              {client.surname}
            </td>
            <td className="px-4 truncate overflow-ellipsis whitespace-nowrap">
              {client.email}
            </td>
            <td className="px-4 truncate overflow-ellipsis whitespace-nowrap">
              {new Date(client.createdAt).toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
              })}
            </td>
            <td>
              <div className="flex justify-evenly">
                <div className="mr-2">
                  <button
                    className="text-blue-500"
                    id={client.id}
                    //   onClick={() => navigate(`/clients/${client.id}`)}>
                    onClick={() => console.log("Details client")}>
                    Details
                  </button>
                </div>
                <div className="mr-2">
                  <button
                    className="text-red-500"
                    id={client.id}
                    //   onClick={() => handleDeleteClient(client.id)}>
                    onClick={() => console.log("Delete client")}>
                    Delete
                  </button>
                </div>
              </div>
            </td>
          </tr>
        ))}
        {clients.length < ITEMS_PER_PAGE &&
          [...Array(ITEMS_PER_PAGE - clients.length)].map((_, index) => (
            <tr
              key={`placeholder-${index}`}
              className="even:bg-gray-50 border-collapse h-[104px]">
              <td className="px-4">&nbsp;</td>
              <td className="px-4">&nbsp;</td>
              <td className="px-4">&nbsp;</td>
              <td className="px-4">&nbsp;</td>
              <td className="px-4">&nbsp;</td>
              <td className="px-4">&nbsp;</td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}

export default ClientsTable
