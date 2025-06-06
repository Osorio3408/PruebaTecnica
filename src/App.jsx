import React, { useEffect, useState } from "react";
import { PaginationControlers } from "./components/paginationControlers";
import { UserTable } from "./components/userTable";
import { PaginationTable } from "./components/paginationTable";
import { Loading } from "./components/Loading";
import { ConfirmationModal } from "./components/ConfirmationModal";
import { UserForm } from "./components/UserForm";
import { toast } from "react-toastify";
import { AddUser } from "./components/AddUser";
import { validateEmail } from "./utils/validations";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { User } from "lucide-react";
import UserSearch from "./components/UserSearch";

const App = () => {
  // URL de la API
  const API_URL = "https://api.fake-rest.refine.dev/users";

  const [users, setUsers] = useState([]); //Estado para almacenar los usuarios del api
  const [loading, setLoading] = useState(true); //Estado para cambiar el estado de carga
  const [page, setPage] = useState(1); //Estado para obtener el número de usuarios por página
  const [limit, setLimit] = useState(10); //Estado para obtener el límite de usuarios por página
  const [total, setTotal] = useState(0); //Estado para almacenar el total de usuarios
  const [currentUser, setCurrentUser] = useState(null); // Nuevo estado para el formulario
  const [userToDelete, setUserToDelete] = useState(null); // Estado para el usuario a eliminar
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
  const [isMobileFormOpen, setIsMobileFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para almacenar el término de búsqueda

  // Función para crear usuario, obtiene los datos del formulario
  // y los envía a la API para crear el usuario
  const createUser = async (userData) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...userData, status: true }),
      });
      const newUser = await response.json();
      setUsers([...users, newUser]);
      setTotal(total + 1);
      toast.success("Usuario creado con éxito", { theme: "light" });
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Error al crear usuario", { theme: "light" });
      throw error;
    }
  };

  // Función para actualizar usuario, obtiene los datos del formulario
  // y los envía a la API para actualizar el usuario
  const updateUser = async (id, userData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const updatedUser = await response.json();
      setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
      toast.success("Usuario actualizado con éxito", { theme: "light" });
      return updatedUser;
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error al actualizar usuario", { theme: "light" });
      throw error;
    }
  };

  // Función para eliminar usuario, obtiene el id del usuario
  // y lo envía a la API para eliminar el usuario
  const deleteUser = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setUsers(users.filter((user) => user.id !== id));
      setTotal(total - 1);
      toast.success("Usuario eliminado con éxito", { theme: "light" });

      // Ajustar paginación si es necesario
      if (paginatedUsers.length === 1 && page > 1) {
        setPage(page - 1);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error al eliminar usuario", { theme: "light" });
      throw error;
    }
  };

  //Función para realizar la paginación, cambia el número de usuarios por página
  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
  };

  // Función para cambiar de página, cambia el número de página
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Función para manejar el cambio en el campo de búsqueda
  const filteredUsers = users.filter(
    (user) =>
      user.status &&
      (user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Calcula usuarios paginados:
  const paginatedUsers = filteredUsers.slice((page - 1) * limit, page * limit);

  // 3. Actualiza el total basado en usuarios filtrados
  useEffect(() => {
    setTotal(filteredUsers.length);
    // Resetear a página 1 cuando se filtra
    if (page !== 1 && searchTerm) {
      setPage(1);
    }
  }, [filteredUsers, page, searchTerm]);

  // Funciones completas CRUD
  const handleAddUser = () => {
    setCurrentUser({
      firstName: "",
      lastName: "",
      email: "",
      status: true,
    });
    // Activar el formulario mobile si es necesario
    setIsMobileFormOpen(true);
  };
  // Función para eliminar un usuario
  const handleDeleteClick = (userId) => {
    setUserToDelete(userId);
    setIsModalOpen(true);
  };

  // Función para confirmar la eliminación
  const handleConfirmDelete = async () => {
    if (userToDelete) {
      try {
        await deleteUser(userToDelete);
        setIsModalOpen(false);
        setUserToDelete(null);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  // Función para cancelar la eliminación
  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setUserToDelete(null);
  };

  // Función para editar un usuario, obtiene el id del usuario
  const handleEditUser = (userId) => {
    const userToEdit = users.find((user) => user.id === userId);
    setCurrentUser(userToEdit);
    setIsMobileFormOpen(true);
  };

  // Función para guardar el usuario, obtiene los datos del formulario
  // y los envía a la función de crear el usuario
  const handleSaveUser = async (userData) => {
    // Validación de campos requeridos
    if (
      !userData.firstName?.trim() ||
      !userData.lastName?.trim() ||
      !userData.email?.trim()
    ) {
      toast.error("Por favor, completa todos los campos.", { theme: "light" });
      return;
    }

    // Validación de email
    if (!validateEmail(userData.email)) {
      toast.error("Por favor, ingresa un correo electrónico válido.", {
        theme: "light",
      });
      return;
    }

    try {
      if (userData.id) {
        // Edición
        await updateUser(userData.id, userData);
      } else {
        // Creación
        await createUser(userData);
      }

      setCurrentUser(null);
      setIsMobileFormOpen(false);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleCancelEdit = () => {
    setCurrentUser(null);
    setIsMobileFormOpen(false);
  };

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setUsers(data.filter((user) => user.status));
        setTotal(data.filter((user) => user.status).length);
      } catch (error) {
        console.error("Error loading users:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <article className="w-full flex flex-col justify-center items-center h-full ">
      {/* <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-blue-800">
        Control de usuarios
      </h1> */}
      <Header />
      {/* Componente de un boton para agregar usuario solo en mobile */}
      <AddUser
        handleAddUser={handleAddUser}
        setIsMobileFormOpen={setIsMobileFormOpen}
      />

      <div className="w-full flex flex-col lg:flex-row gap-10 justify-center items-start px-2 py-2 my-10">
        {/* Parte izquierda donde se verán los usuarios */}
        <div className="max-w-full w-full lg:w-1/2 h-full space-y-2">
          {/* Mostrar Loading o la tabla según el estado */}
          {loading ? (
            <Loading name={"usuarios"} />
          ) : (
            <>
              <UserSearch onSearch={(term) => setSearchTerm(term)} />
              {searchTerm && (
                <div className="text-sm text-gray-500 mb-2">
                  Mostrando {filteredUsers.length} resultados para "{searchTerm}
                  "
                </div>
              )}
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

        {/* Panel derecho - visible solo en desktop */}
        <div className="hidden lg:block w-full lg:w-1/2 h-full bg-blue-100 p-4 rounded-lg shadow my-auto">
          {currentUser ? (
            <UserForm
              user={currentUser}
              onSave={handleSaveUser}
              onCancel={handleCancelEdit}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 text-black">
              <p className="mb-4">Selecciona un usuario para editar o</p>
              <button
                onClick={handleAddUser}
                className="px-4 py-2 flex items-center justify-center gap-2 hover:cursor-pointer bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Agregar nuevo usuario
                <User />
              </button>
            </div>
          )}
        </div>
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

      {/* Modal de formulario - visible solo en mobile */}
      <div className="lg:hidden">
        {isMobileFormOpen && currentUser && (
          <UserForm
            user={currentUser}
            onSave={handleSaveUser}
            onCancel={handleCancelEdit}
            isMobile={true}
          />
        )}
      </div>
      <Footer />
    </article>
  );
};

export default App;
