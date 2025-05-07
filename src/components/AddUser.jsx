import { Plus } from 'lucide-react';
import React from 'react'

export const AddUser = ({handleAddUser, setIsMobileFormOpen}) => {
  return (
         <button
           onClick={() => {
             handleAddUser();
             setIsMobileFormOpen(true);
           }}
           className="lg:hidden fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors z-40"
           aria-label="Agregar usuario"
         >
           <Plus />
         </button>
  )
}
