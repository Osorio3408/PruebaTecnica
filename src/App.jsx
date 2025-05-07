import { Delete, Pencil, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { PaginationControlers } from "./components/paginationControlers";
import { UserTable } from "./components/userTable";
import { PaginationTable } from "./components/paginationTable";
import { Loading } from "./components/Loading";
import { ConfirmationModal } from "./components/ConfirmationModal";
import { UserForm } from "./components/UserForm";
import { toast } from "react-toastify";

const App = () => {
  const [users, setUsers] = useState([]); //Estado para almacenar los usuarios del api
  const [loading, setLoading] = useState(true); //Estado para cambiar el estado de carga
  const [page, setPage] = useState(1); //Estado para obtener el número de usuarios por página
  const [limit, setLimit] = useState(10); //Estado para obtener el límite de usuarios por página
  const [total, setTotal] = useState(0); //Estado para almacenar el total de usuarios
  const [currentUser, setCurrentUser] = useState(null); // Nuevo estado para el formulario
  const [userToDelete, setUserToDelete] = useState(null); // Estado para el usuario a eliminar
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024); // Detectar si es móvil
  const [isMobileFormOpen, setIsMobileFormOpen] = useState(false);

  //Función para realizar la paginación
  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
  };

  // Función para cambiar de página
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Calcula usuarios paginados:
  const paginatedUsers = users.slice((page - 1) * limit, page * limit);

  // Funciones completas CRUD
  const handleAddUser = () => {
    setCurrentUser({ firstName: "", lastName: "", email: "", status: true });
  };

  // Función para eliminar un usuario
  const handleDeleteClick = (userId) => {
    setUserToDelete(userId);
    setIsModalOpen(true);
  };

  // Función para confirmar la eliminación
  const handleConfirmDelete = () => {
    if (userToDelete) {
      setUsers(users.filter((user) => user.id !== userToDelete));
      setTotal(total - 1);

      // Ajustar la página si quedó vacía
      if (paginatedUsers.length === 1 && page > 1) {
        setPage(page - 1);
      }

      setIsModalOpen(false);
      setUserToDelete(null);
    }
  };

  // Función para cancelar la eliminación
  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setUserToDelete(null);
  };

  // Función para editar un usuario

  const handleEditUser = (userId) => {
    const userToEdit = users.find((user) => user.id === userId);
    setCurrentUser(userToEdit);
    if (isMobile) {
      setIsMobileFormOpen(true);
    }
  };

  const handleSaveUser = (userData) => {
    if (!userData.firstName || !userData.lastName || !userData.email) {
      toast.error("Por favor, completa todos los campos.", {
        theme: "dark",
      });
      return;
    }
    console.log(userData);
    if (userData.id) {
      // Edición
      setUsers(users.map((u) => (u.id === userData.id ? userData : u)));
    } else {
      // Creación
      setUsers([...users, { ...userData, id: Date.now() }]);
      setTotal(total + 1);
    }
    setCurrentUser(null);
    setIsMobileFormOpen(false);
  };

  const handleCancelEdit = () => {
    setCurrentUser(null);
    setIsMobileFormOpen(false);
  };

  useEffect(() => {
    setLoading(true); // Activar loading al iniciar el fetch

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
      })
      .finally(() => {
        setLoading(false); // Desactivar loading cuando termine
      });
  }, [limit]);

  return (
    <article className="w-full flex flex-col justify-center items-center px-1 py-2">
      <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-indigo-800">
        Control de usuarios
      </h1>

      <div className="w-full flex flex-col lg:flex-row gap-20 justify-center items-start">
        {/* Parte izquierda donde se verán los usuarios */}
        <div className="max-w-full w-full lg:w-1/2 h-full space-y-2">
          {/* Mostrar Loading o la tabla según el estado */}
          {loading ? (
            <Loading name={"usuarios"} />
          ) : (
            <>
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
                handleDelete={handleDeleteClick}
              />
              {/* Componente para mostrar la paginación */}
              <PaginationTable
                limit={limit}
                total={total}
                page={page}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
        {/* Panel derecho - Solo visible en desktop */}
        {!isMobile && (
          <div className="hidden lg:block w-full lg:w-1/2 h-full bg-neutral-800 p-4 rounded-lg shadow my-auto">
            {currentUser ? (
              <UserForm
                user={currentUser}
                onSave={handleSaveUser}
                onCancel={handleCancelEdit}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8 text-gray-500">
                <p className="mb-4">Selecciona un usuario para editar o</p>
                <button
                  onClick={handleAddUser}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Agregar nuevo usuario
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal de confirmación de eliminación */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Eliminar usuario"
        message="¿Estás seguro que deseas eliminar este usuario? Esta acción no se puede deshacer."
        confirmText={"Eliminar"}
      />

      {/* Modal de formulario para móviles */}
      {isMobile && isMobileFormOpen && (
        <UserForm
          user={currentUser}
          onSave={handleSaveUser}
          onCancel={handleCancelEdit}
          isMobile={true}
        />
      )}
    </article>
  );
};

export default App;
