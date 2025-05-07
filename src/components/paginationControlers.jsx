import React from "react";

/**
 * Componente para mostrar/editar usuarios
 * @param {number} limit - Número de usuarios por página
 * @param {number} total - Total de usuarios
 * @param {number} page - Página actual
 * @param {(limit: number) => void} onLimitChange - Callback para cambiar el límite de usuarios por página
 */
export const PaginationControlers = ({ limit, total, page, onLimitChange }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center w-full mt-2 px-2 gap-3">
      <div className="flex items-center">
        <label htmlFor="limit" className="mr-2">
          Usuarios por página:
        </label>
        <select
          id="limit"
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="border-b bg-neutral-100 outline-none roundend px-2 py-1"
        >
          {[2, 5, 10, 20, 50].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <span className="text-sm">
          Mostrando {(page - 1) * limit + 1}-{Math.min(page * limit, total)} de{" "}
          {total} usuarios
        </span>
      </div>
    </div>
  );
};
