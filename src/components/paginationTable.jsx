import React from "react";

/**
 * Componente para mostrar/editar usuarios
 * @param {number} limit - Número de usuarios por página
 * @param {number} total - Total de usuarios
 * @param {number} page - Página actual
 * @param {(page: number) => void} onPageChange - Callback para cambiar de página
 */
export const PaginationTable = ({
  limit,
  total,
  page,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex items-center mx-auto justify-center gap-1">
      <button
        onClick={() => onPageChange(1)}
        disabled={page === 1}
        className="px-3 py-1 border hover:bg-blue-400 rounded disabled:opacity-50"
      >
        «
      </button>
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1 border hover:bg-blue-400 rounded disabled:opacity-50"
      >
        ‹
      </button>

      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
        let pageNum;
        if (totalPages <= 5) {
          pageNum = i + 1;
        } else if (page <= 3) {
          pageNum = i + 1;
        } else if (page >= totalPages - 2) {
          pageNum = totalPages - 4 + i;
        } else {
          pageNum = page - 2 + i;
        }

        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`px-3 py-1 border rounded hover:bg-blue-400 ${
              page === pageNum ? "bg-blue-500 text-white " : ""
            }`}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-1 border rounded hover:bg-blue-400 disabled:opacity-50"
      >
        ›
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={page === totalPages}
        className="px-3 py-1 border rounded hover:bg-blue-400 disabled:opacity-50"
      >
        »
      </button>
    </div>
  );
};
