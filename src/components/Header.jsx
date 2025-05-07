import React from "react";

export const Header = () => {
  return (
    <header className="bg-blue-700 w-full  px-4 h-20 flex items-center justify-between  text-white shadow-md">
      <div>
        <img src={"./logo.png"} alt="LOGO INGCO" />
      </div>

      <div className="flex items-center space-x-4"></div>
      <div className="hidden md:block text-white font-semibold text-2xl">
        <h1>PRUEBA TECNICA - INGCO</h1>
      </div>
    </header>
  );
};
