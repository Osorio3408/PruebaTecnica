/**
 * Componente para mostrar/editar usuarios
 * @param {string} name - descripción del componente
 */

export const Loading = ({ name }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
      <p className="text-gray-600 font-medium">Cargando {name}...</p>
      <p className="text-sm text-gray-400">Por favor espere</p>
    </div>
  );
};
