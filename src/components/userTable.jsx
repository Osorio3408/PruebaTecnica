import { Pencil, Trash } from "lucide-react";
import React from "react";

export const UserTable = ({ users, handleEdit, handleDelete }) => {
  return (
    <>
      {/* Versión mobile*/}
      <div className="sm:hidden w-full space-y-3 mt-3">
        <div className="w-full space-y-3 mt-3">
          {users.map((user) => (
            <div key={user.id} className="border rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <p className="font-semibold">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <div className="flex flex-col gap-y-2 space-x-2">
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="text-indigo-800 p-1 cursor-pointer"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-800 p-1 cursor-pointer"
                  >
                    <Trash size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Versión tablet*/}
      <div className="hidden sm:block xl:hidden overflow-x-auto h-[550px] overflow-y-scroll">
        <table className="min-w-full border mx-auto rounded-lg mt-3">
          <thead>
            <tr>
              <th className="py-2 px-2 border">Nombre</th>
              <th className="py-2 px-2 border">Correo</th>
              <th className="py-2 px-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-2 ">
                  {user.firstName} {user.lastName.charAt(0)}.
                </td>
                <td className="py-2 px-2  text-sm">{user.email}</td>
                <td className="py-2 px-2  flex justify-center space-x-2">
                  <button onClick={() => handleEdit(user.id)}>
                    <Pencil
                      className="text-indigo-800 cursor-pointer"
                      size={16}
                    />
                  </button>
                  <button onClick={() => handleDelete(user.id)}>
                    <Trash className="text-red-800 cursor-pointer" size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Versión desktop */}
      <div className="hidden xl:block overflow-x-auto h-[550px] overflow-y-scroll">
        <table className="min-w-full border mx-auto rounded-lg mt-3">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Nombre</th>
              <th className="py-2 px-4 border">Apellido</th>
              <th className="py-2 px-4 border">Correo</th>
              <th className="py-2 px-4 border">Eliminar</th>
              <th className="py-2 px-4 border">Editar</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4 border">{user.firstName}</td>
                <td className="py-2 px-4 border">{user.lastName}</td>
                <td className="py-2 px-4 border">{user.email}</td>
                <td className="py-2 px-4 border">
                  <button onClick={() => handleDelete(user.id)}>
                    <Trash className="text-red-800 cursor-pointer" />
                  </button>
                </td>
                <td className="py-2 px-4 border">
                  <button onClick={() => handleEdit(user.id)}>
                    <Pencil className="text-indigo-800 cursor-pointer" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
