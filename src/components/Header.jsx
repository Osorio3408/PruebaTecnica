import React from "react";

export const Header = () => {
  return (
    <header className="bg-blue-800 w-full  px-4 h-16 flex items-center justify-between  text-white shadow-md">
      <div>
        <img src={"./logo.png"} alt="LOGO INGCO" />
      </div>

      <div className="flex items-center space-x-4"></div>
        <div className="hidden md:block text-white font-semibold text-lg">
        <h1>PRUEBA TECNICA - INGCO</h1>
      </div>
    </header>
  );
};
