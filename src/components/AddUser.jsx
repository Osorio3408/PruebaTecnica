import { Plus } from 'lucide-react';
import React from 'react'

/**
 * Componente para mostrar/editar usuarios
 * * @param {function} handleAddUser - Callback para agregar usuario
 * * @param {function} setIsMobileFormOpen - Callback para abrir el formulario móvil
 */
export const AddUser = ({handleAddUser, setIsMobileFormOpen}) => {
  return (
    <button
      onClick={() => {
        handleAddUser();
        setIsMobileFormOpen(true);
      }}
      className="lg:hidden fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-40"
      aria-label="Agregar usuario"
    >
      <Plus />
    </button>
  );
}
