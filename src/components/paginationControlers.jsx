// components/paginationControlers.jsx
import React from "react";

export const PaginationControlers = ({
  limit,
  total,
  page,
  onLimitChange,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / limit);

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
          className="border-b bg-neutral-800 outline-none roundend px-2 py-1"
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
