import { Delete, Pencil, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { PaginationControlers } from "./components/paginationControlers";
import { UserTable } from "./components/userTable";
import { PaginationTable } from "./components/paginationTable";


const App = () => {
  //Estado para almacenar los usuarios del api
  const [users, setUsers] = useState([]);

  //Estado para obtener el número de usuarios por página
  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(2);

  //Estado para almacenar el total de usuarios
  const [total, setTotal] = useState(0);

  //Función para realizar la paginación
  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
  };

  // Función para cambiar de página
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Calcula usuarios paginados
  const paginatedUsers = users.slice((page - 1) * limit, page * limit);

  // Función para eliminar un usuario
  const handleDeleteUser = (userId) => {};

  // Función para editar un usuario
  const handleEditUser = (userId) => {};

  useEffect(() => {
    fetch("https://api.fake-rest.refine.dev/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.filter((user) => user.status));
        setTotal(data.filter((user) => user.status).length);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [page, limit]);

  return (
    <article className="w-full flex flex-col justify-center items-center px-1 py-2">
      <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-indigo-800">
        Control de usuarios
      </h1>

      <div className="w-full flex flex-col lg:flex-row gap-20 justify-center items-start">
        {/* Parte izquierda donde se verán los usuarios */}
        <div className="max-w-full w-full lg:w-[50%] h-full space-y-2">
          {/* Componente para poner el máximo de usuarios por página  */}
          <PaginationControlers
            limit={limit}
            total={total}
            page={page}
            onLimitChange={handleLimitChange}
            onPageChange={handlePageChange}
          />
          {/* Componente para mostrar los usuario en una tabla */}
          <UserTable
            users={paginatedUsers}
            handleEdit={handleEditUser}
            handleDelete={handleDeleteUser}
          />
          {/* Componente para mostrar la paginación */}
          <PaginationTable
            limit={limit}
            total={total}
            page={page}
            onPageChange={handlePageChange}
          />
        </div>
        {/* Parte derecha donde se verán los detalles del usuario, se agregaran o se editaran*/}
        <div className="max-w-full w-full lg:w-[50%] h-full bg-neutral-400 borderflex justify-between items-center mt-5">
          <div></div>
        </div>
      </div>
    </article>
  );
};

export default App;
