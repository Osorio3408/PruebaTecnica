// components/UserForm.jsx
import React, { useState } from "react";
import { X, Save } from "lucide-react";

export const UserForm = ({ user, onSave, onCancel, isMobile = false }) => {
  const [formData, setFormData] = useState(
    user || {
      firstName: "",
      lastName: "",
      email: "",
      status: true,
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div
      className={`
      ${
        isMobile
          ? "fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 lg:hidden"
          : "lg:block"
      }
    `}
    >
      <div
        className={`
        bg-neutral-900 rounded-lg shadow-xl 
        ${isMobile ? "w-full max-w-md p-2" : "w-full h-full p-6"}
      `}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-300">
            {user?.id ? "Editar Usuario" : "Nuevo Usuario"}
          </h3>
          {isMobile && (
            <button
              onClick={onCancel}
              className="text-gray-300 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Nombre
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Apellido
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            {!isMobile && (
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-300 hover:bg-neutral-800"
              >
                Cancelar
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 rounded-md text-sm font-medium text-white hover:bg-indigo-700 flex items-center"
            >
              <Save size={16} className="mr-2" />
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
