
/**
 * Componente para mostrar/editar usuarios
 * @param {function} onSearch - Callback para buscar usuarios
 */
import React, { useState } from "react";
import { Search } from "lucide-react";

const UserSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="relative w-full mb-4">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Buscar usuarios..."
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default UserSearch;