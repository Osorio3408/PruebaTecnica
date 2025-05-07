import React from "react";

/**
 * Componente para mostrar/editar usuarios
 * @param {boolean} isOpen - Estado de la modal
 * @param {() => void} onClose - Callback para cerrar la modal
 * @param {() => void} onConfirm - Callback para confirmar la acción
 * @param {string} title - Título de la modal
 * @param {string} message - Mensaje de la modal
 * @param {string} confirmText - Texto del botón de confirmar
 */
export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-neutral-800/90 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">{message}</p>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm cursor-pointer hover:bg-red-800 focus:outline-none outline-none  sm:ml-3 sm:w-auto sm:text-sm"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-200 cursor-pointer focus:outline-none focus:ring-2  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
